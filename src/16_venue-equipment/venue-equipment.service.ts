// src/venue-equipment/venue-equipment.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { VenueEquipment } from 'entity/venue/venue_equipment.entity';
import { Equipment } from 'entity/venue/equipment.entity';
import { AddEquipmentToVenueDto, UpdateVenueEquipmentDto } from 'dto/venue/equipment.dto';
import { I18n, I18nService } from 'nestjs-i18n';

@Injectable()
export class VenueEquipmentService {
  constructor(
    @InjectRepository(VenueEquipment)
    private readonly venueEquipmentRepository: Repository<VenueEquipment>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private i18n: I18nService
  ) {}

  async addEquipmentToVenue(venueId: number, dto: AddEquipmentToVenueDto) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } , relations : ["venueEquipments"] });
    if (!venue) throw new NotFoundException(this.i18n.t('events.venue.not_found', { args: { id: venueId } }));

    const equipment = await this.equipmentRepository.findOne({ where: { id: dto.equipment_id } });
    if (!equipment) throw new NotFoundException(this.i18n.t('events.equipment_not_found', { args: { equipmentId: dto.equipment_id } }));

    const existingVenueService = venue.venueEquipments.find((vs:any ) => vs.id === equipment.id, );
    if (existingVenueService) {
      throw new NotFoundException(
        this.i18n.t('events.service.already_associated', {
          args: { serviceId: equipment.id, venueId: venue.id },
        }),
      );
    }

    const venueEquipment = this.venueEquipmentRepository.create({
      venue,
      equipment,
      count: dto.count,
      price: dto.price,
      price_per: dto.price_per,
    });

    return this.venueEquipmentRepository.save(venueEquipment);
  }



  async getEquipmentForVenue(venueId: number) {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(this.i18n.t('events.venue.not_found', { args: { id: venueId } }));
    }

    return await this.venueEquipmentRepository.find({
      where: { venue: { id: venueId } },
      relations: ['equipment', 'equipment.iconMedia'],
    });
  }

  async removeEquipmentFromVenue(id: number): Promise<{ message: string }> {
    const venueEquipment = await this.venueEquipmentRepository.findOne({ where: { id } });
    if (!venueEquipment) {
      throw new NotFoundException(this.i18n.t('events.venue_equipment_not_found', { args: { id: id } }));
    }

    await this.venueEquipmentRepository.remove(venueEquipment);

    return { message: this.i18n.t('events.venue_equipment_deleted', { args: { id: id } }) };
  }
}
