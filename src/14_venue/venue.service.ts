import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateVenueDto, UpdateVenueDto } from 'dto/venue/venue.dto';
import { Venue } from 'entity/venue/venue.entity';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Feature } from 'entity/venue/feature.entity';
import { VenueFeature } from 'entity/venue/venue_feature.entity';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { Property } from 'entity/property/property.entity';
import { I18nService } from 'nestjs-i18n';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class VenueService extends BaseService<Venue> {
  constructor(
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
    @InjectRepository(OccasionType)
    private occasionTypeRepository: Repository<OccasionType>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
    @InjectRepository(VenueFeature)
    private venueFeatureRepository: Repository<VenueFeature>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>
  ) {
    super(venueRepository);
  }

  public relations: string[] = [
    'occasion',
    'ratings',
    // 'venueServices',
    // 'venueEquipments',
    // 'reservations',
    // "venuePackages",
    'venueGalleries',
    // 'venueFeatures',
    // 'venuePolicies',
    // 'venueFAQs',
    // 'venueCalendars',
  ];
  public relationsOne: string[] = [
    'occasion',
    'ratings',
    "property" ,"property.city" , "property.city.country" ,
    // 'venueServices',
    // 'venueEquipments',
    // 'reservations',
    // "venuePackages",
    // "venuePackages.services.service",
    // "venuePackages.equipments.equipment",
    'venueGalleries',

    // 'venueFeatures',
    // 'venuePolicies.policy',
    'venueFAQs',
    // 'venueCalendars',
  ];

  


  //'venueFeatures.feature',
  //'venuePolicies.policy',

  async createCustom(dto: CreateVenueDto): Promise<Venue> {
    dto.occasion && (await checkFieldExists(this.occasionTypeRepository, { id: dto.occasion }, this.i18n.t('events.venue.occasion_type_not_found'), true)); //!'Occasion type does not exist'
    dto.property && (await checkFieldExists(this.propertyRepository, { id: dto.property }, this.i18n.t('events.venue.property_not_found'), true)); //!'Property does not exist'

    const venue = this.venueRepository.create({
      ...(dto as any),
      occasion_type: { id: dto.occasion }, // Set the relation
    });
    const savedVenue: any = await this.venueRepository.save(venue);

    return this.venueRepository.findOne({
      where: { id: savedVenue.id },
      relations: ['occasion', 'venueFeatures', 'venueFeatures.feature', 'venueFeatures.feature.iconMedia'],
    });
  }

  async customFind(
    entityName: string,
     page: any = 1,
     limit: any = 10,
     sortBy?: string,
     sortOrder: 'ASC' | 'DESC' = 'DESC',
     fieldsExclude?: string[],
     visitor?: number,
     city?: number,
     occasion?: number | number[] ,
     startOccasion?: string,
     mostVisited?: boolean,
     highestRated?: boolean,
     newest?: boolean,
     minPrice?: number, // New: Minimum price
      maxPrice?: number 
    ) {
    // Existing logic for pagination, sorting, filtering, etc.
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException(this.i18n.t('events.invalid_pagination'));
    }

    if (!['ASC', 'DESC'].includes(sortOrder)) {
      throw new BadRequestException(this.i18n.t('events.invalid_sort_order'));
    }

    const skip = (pageNumber - 1) * limitNumber;
    const query = this.repository.createQueryBuilder(entityName).skip(skip).take(limitNumber);

    this.relations.forEach(relation => {
      query.leftJoinAndSelect(`${entityName}.${relation}`, relation);
    }); 

    query.leftJoinAndSelect(`${entityName}.property`, 'property').leftJoinAndSelect('property.city', 'city').leftJoinAndSelect('city.country', 'country');

    // Add filters based on query parameters
    if (visitor !== undefined) query.andWhere('venue.max_capacity >= :visitor', { visitor });
    if (city !== undefined) query.andWhere('property.city.id = :city', { city });

    if (mostVisited)  query.orderBy('venue.visitCount', 'DESC');
    if (newest)  query.orderBy('venue.created_at', 'DESC');
    

    if (occasion !== undefined) {
      if (Array.isArray(occasion)) {
        // If occasion is an array of IDs, use IN clause
        query.andWhere('occasion.id IN (:...occasionIds)', { occasionIds: occasion });
      } else {
        // If occasion is a single ID, use equality check
        query.andWhere('occasion.id = :occasion', { occasion });
      }
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      query.andWhere('venue.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
    } else if (minPrice !== undefined) {
      query.andWhere('venue.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      query.andWhere('venue.price <= :maxPrice', { maxPrice });
    }


    // Fetch data
    const [data, total] = (await query.getManyAndCount()) as any;

    // Exclude specified fields from the response
    if (fieldsExclude?.length > 0) {
      const invalidExcludeFields = fieldsExclude.filter(field => !this.repository.metadata.columns.some(col => col.propertyName === field));
      if (invalidExcludeFields.length > 0) {
        throw new BadRequestException(this.i18n.t('events.invalid_exclude_fields', { args: { fields: invalidExcludeFields.join(', ') } }));
      }

      data.forEach(item => {
        fieldsExclude.forEach(field => delete item[field]);
      });
    }

      const venuesWithAverageRating = data.map(venue => {
        const totalRating = venue.ratings?.reduce((sum, e) => sum + +e.rating, 0) || 0;
        const averageRating = venue.ratings?.length > 0 ? totalRating / venue.ratings.length : 0;
        return {
          ...venue,
          averageRating: Number(averageRating).toFixed(1),
        };
      });

      if (highestRated) {
        venuesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
      }

      const venues = await this.repository.find({})
      const prices = venues.map(venue => venue.price).filter(price => price !== undefined);
      const minPriceval = prices.length > 0 ? Math.min(...prices) : undefined;
      const maxPriceval = prices.length > 0 ? Math.max(...prices) : undefined;

      return { limit: limitNumber, countRecored: total, page: pageNumber, data: venuesWithAverageRating , minPriceval , maxPriceval };

  }


  async customFindOne(id) {
    const venue = await this.venueRepository.findOne({ where: { id }, relations: this.relationsOne });

    if (!venue) {
      throw new NotFoundException(this.i18n.t('events.record_not_found', { args: { id } }));
    }

    venue.visitCount += 1;
    await this.venueRepository.save(venue);

    const totalRating = venue.ratings.reduce((sum, e) => sum + +e.rating, 0);
    const averageRating = totalRating / venue.ratings.length;

    // ✅ جلب القاعات المشابهة بناءً على نفس `occasion_id`
  const similarVenues = await this.venueRepository.find({
    where: { occasion:{id : venue.occasion.id}, id: Not(id) }, // استثناء القاعة الحالية
    take: 3, 
    relations : ["property" , "venueGalleries" ,"property.city" , "property.city.country"   , "ratings" ] ,
    order: { visitCount: 'DESC' },
  });

    return { averageRating: Number(averageRating).toFixed(1), venue , similarVenues };
  }
}
