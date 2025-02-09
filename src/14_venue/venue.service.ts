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
    'venueServices', 
    'venueEquipments', 
    "reservations",
    "venuePackages",
    "venueGalleries",
    'venueFeatures', 'venueFeatures.feature', 
    'venuePolicies', 'venuePolicies.policy', 
    'venueFAQs', 
    'venueCalendars', 
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


}
