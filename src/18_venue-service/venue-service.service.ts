import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddServiceToVenueDto } from 'dto/venue/service.dto';
import { VenueService } from 'entity/venue/venue_service.entity';
import { Service } from 'entity/venue/service.entity';
import { Venue } from 'entity/venue/venue.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class VenueServiceService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(VenueService)
    private readonly venueServiceRepository: Repository<VenueService>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private i18n: I18nService
  ) {}

  async addServiceToVenue(venueId: number, dto: AddServiceToVenueDto) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId }, relations: ['venueServices'] });
    if (!venue) throw new NotFoundException(this.i18n.t('events.venue.not_found', { args: { id: venueId } }));

    const service = await this.serviceRepository.findOne({ where: { id: dto.service } });
    if (!service) throw new NotFoundException(this.i18n.t('events.service.not_found', { args: { id: dto.service } }));

    // Check if the service is already associated with the venue
    const existingVenueService = venue.venueServices.find(vs => vs?.service?.id === service.id);
    if (existingVenueService) {
      throw new NotFoundException(
        this.i18n.t('events.service.already_associated', {
          args: { serviceId: service.id, venueId: venue.id },
        })
      );
    }

    const venueService = this.venueServiceRepository.create({
      venue,
      service,
      price: dto.price,
    });
    await this.venueServiceRepository.save(venueService);

    return venueService;
  }

  async removeServiceFromVenue(venueId: number, serviceId: number) {
    const venueService = await this.venueServiceRepository.findOne({
      where: { venue: { id: venueId }, service: { id: serviceId } },
    });

    if (!venueService) {
      throw new NotFoundException(this.i18n.t('events.service.not_found_for_venue', { args: { serviceId: serviceId, venueId: venueId } }));
    }

    await this.venueServiceRepository.remove(venueService);
    return { message: this.i18n.t('events.service.removed_from_venue', { args: { serviceId: serviceId, venueId: venueId } }) };
  }

  async getServicesForVenue(venueId: number) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(this.i18n.t('events.venue.not_found', { args: { id: venueId } }));
    }

    const venueServices = await this.venueServiceRepository.find({
      where: { venue: { id: venueId } },
      relations: ['service', 'venue'],
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
