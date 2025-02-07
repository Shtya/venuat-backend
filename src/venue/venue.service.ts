import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private propertyRepository: Repository<Property> ,
  ) {
    super(venueRepository);
  }

  // async customFind(){
  //   return await this.venueRepository.find({ relations: this.relations });
  // }
  public relations: string[] = [
    'occasion', 
    'property',
    'venueServices', // 'venueServices.service',
    'venueEquipments', 
    "reservations",
    "venuePackages",
    "venueGalleries"
    // 'venueFeatures', 'venueFeatures.feature', 'venueFeatures.feature.iconMedia', 
    // 'venuePolicies', 'venuePolicies.policy', 
    // 'venueFAQs', 
    // 'venueCalendars', 
  ];



  async createCustom(dto: CreateVenueDto): Promise<Venue> {
    dto.occasion && (await checkFieldExists(this.occasionTypeRepository, { id: dto.occasion }, this.i18n.t("events.venue.occasion_type_not_found") , true)); //!'Occasion type does not exist'
    dto.property && (await checkFieldExists(this.propertyRepository, { id: dto.property }, this.i18n.t("events.venue.property_not_found") , true)); //!'Property does not exist'

    const venue = this.venueRepository.create({
      ...dto as any ,
      occasion_type: { id: dto.occasion }, // Set the relation
    });
    const savedVenue : any = await this.venueRepository.save(venue);

    return this.venueRepository.findOne({
      where: { id : savedVenue.id } ,
      relations: ['occasion', 'venueFeatures', 'venueFeatures.feature', 'venueFeatures.feature.iconMedia'],
    });
  }

  
  //! Features
  async addFeatureToVenue(venueId: number, addFeatureToVenueDto: AddFeatureToVenueDto): Promise<VenueFeature> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(this.i18n.t("events.venue.venue_not_found_by_id"  , {args : {venueId}} ) ); //!`Venue with ID ${venueId} not found`
    }

    const feature = await this.featureRepository.findOne({ where: { id: addFeatureToVenueDto.feature_id } });
    if (!feature) {
      throw new NotFoundException(this.i18n.t("events.venue.feature_not_found"  , {args : {featureId : addFeatureToVenueDto.feature_id}} ) ); //!`Feature with ID ${addFeatureToVenueDto.feature_id} not found`
    }

    const venueFeature = this.venueFeatureRepository.create({
      venue,
      feature,
    });

    return this.venueFeatureRepository.save(venueFeature);
  }
}
