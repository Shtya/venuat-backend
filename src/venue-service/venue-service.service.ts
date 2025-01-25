// src/venue-service/venue-service.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddServiceToVenueDto, CreateVenueServiceDto, UpdateVenueServiceDto } from 'dto/venue/service.dto';
import { VenueService } from 'entity/venue/venue_service.entity';
import { Service } from 'entity/venue/service.entity';
import { Venue } from 'entity/venue/venue.entity';

@Injectable()
export class VenueServiceService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(VenueService)
    private readonly venueServiceRepository: Repository<VenueService>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) {}

  //! Services
  async addServiceToVenue(venueId: number, addServiceToVenueDto: AddServiceToVenueDto) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    const service = await this.serviceRepository.findOne({
      where: { id: addServiceToVenueDto.service_id },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${addServiceToVenueDto.service_id} not found`);
    }

    // const venueService = this.venueServiceRepository.create(addServiceToVenueDto);
    return this.venueServiceRepository.create({
      venue,
      service,
      price: addServiceToVenueDto.price,
    });

    // return this.venueServiceRepository.save(venueService);
  }

  // Remove a service from a venue
  async removeServiceFromVenue(venueId: number, serviceId: number) {
    const venueService = await this.venueServiceRepository.findOne({
      where: { venue: { id: venueId }, service: { id: serviceId } },
    });

    if (!venueService) {
      throw new NotFoundException(`Service with ID ${serviceId} not found for Venue with ID ${venueId}`);
    }

    await this.venueServiceRepository.remove(venueService);
    return { message: `Service with ID ${serviceId} has been removed from venue with ID ${venueId}` };
  }

  async getServicesForVenue(venueId: number) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    console.log(venueId)
    const venueServices = await this.venueServiceRepository.find({
      // where: { venue: { id: venueId } },
      where: { venue: { id: venueId } },
      relations: ['service' , "venue" ], // Load the associated service
    });

    return venueServices.map(vs => ({
      id: vs.service.id,
      name: vs.service.name,
      price: vs.price,
      created_at: vs.created_at,
      updated_at: vs.updated_at,
    }));
  }
}
