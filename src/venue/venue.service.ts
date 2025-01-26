import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVenueDto, UpdateVenueDto } from 'dto/venue/venue.dto';
import { Venue } from 'entity/venue/venue.entity';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Feature } from 'entity/venue/feature.entity';
import { VenueFeature } from 'entity/venue/venue_feature.entity';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { Service } from 'entity/venue/service.entity';
import { VenueService as VenueServiceEntity } from 'entity/venue/venue_service.entity';
import { AddServiceToVenueDto } from 'dto/venue/service.dto';
import { Property } from 'entity/property/property.entity';

@Injectable()
export class VenueService {
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
    private propertyRepository: Repository<Property>,
    
  ) {}
  
  public relations: string[] = [
    'occasion_type', 
    'venueFeatures', 'venueFeatures.feature', 'venueFeatures.feature.iconMedia',
    "venueServices" , "venueServices.service",
    'venueEquipments',
    "venuePolicies" , "venuePolicies.policy",
    'venueFAQs',
    'venueCalendars',
    "property"
  ];

  async create(dto: CreateVenueDto): Promise<Venue> {
    dto.occasion_type_id &&  await checkFieldExists(this.occasionTypeRepository, { id: dto.occasion_type_id }, 'Occasion type does not exist', true);
    dto.property_id &&  await checkFieldExists(this.propertyRepository, { id: dto.property_id }, 'Property does not exist', true);

    
    const venue = this.venueRepository.create({
      ...dto,
      occasion_type: { id: dto.occasion_type_id }, // Set the relation
    });
    const savedVenue = await this.venueRepository.save(venue);

    return this.venueRepository.findOne({
      where: { id: savedVenue.id },
      relations: ['occasion_type', 'venueFeatures', 'venueFeatures.feature', 'venueFeatures.feature.iconMedia'],
    });
  }

  async findAll(): Promise<Venue[]> {
    return this.venueRepository.find({ relations :this.relations});
  }

  async findOne(id: number): Promise<Venue> {
    const venue = await this.venueRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return venue;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);
    Object.assign(venue, updateVenueDto);
    return this.venueRepository.save(venue);
  }

  async remove(id: number): Promise<void> {
    const venue = await this.findOne(id);
    await this.venueRepository.remove(venue);
  }

  //! Features
  async addFeatureToVenue(venueId: number, addFeatureToVenueDto: AddFeatureToVenueDto): Promise<VenueFeature> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    const feature = await this.featureRepository.findOne({ where: { id: addFeatureToVenueDto.feature_id } });
    if (!feature) {
      throw new NotFoundException(`Feature with ID ${addFeatureToVenueDto.feature_id} not found`);
    }

    const venueFeature = this.venueFeatureRepository.create({
      venue,
      feature,
    });

    return this.venueFeatureRepository.save(venueFeature);
  }


}
