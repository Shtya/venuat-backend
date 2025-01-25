// src/venue-equipment/venue-equipment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { VenueEquipment } from 'entity/venue/venue_equipment.entity';
import { Equipment } from 'entity/venue/equipment.entity';
import { AddEquipmentToVenueDto, UpdateVenueEquipmentDto } from 'dto/venue/equipment.dto';

@Injectable()
export class VenueEquipmentService {
  constructor(
    @InjectRepository(VenueEquipment)
    private readonly venueEquipmentRepository: Repository<VenueEquipment>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async addEquipmentToVenue(venueId: number, addEquipmentToVenueDto: AddEquipmentToVenueDto){
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    const equipment = await this.equipmentRepository.findOne({ where: { id: addEquipmentToVenueDto.equipment_id } });
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${addEquipmentToVenueDto.equipment_id} not found`);
    }

    const venueEquipment = this.venueEquipmentRepository.create({
      venue,
      equipment,
      count: addEquipmentToVenueDto.count,
      price: addEquipmentToVenueDto.price,
      price_per: addEquipmentToVenueDto.price_per,
    });

    return this.venueEquipmentRepository.save(venueEquipment);
  }


  async getEquipmentForVenue(venueId: number)  {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    return await this.venueEquipmentRepository.find({
      where: { venue: { id: venueId } },
      relations: ['equipment' , 'equipment.iconMedia'], // Load the associated equipment
    });
  }


  async removeEquipmentFromVenue(id: number): Promise<{ message: string }> {
    const venueEquipment = await this.venueEquipmentRepository.findOne({ where: { id } });
    if (!venueEquipment) {
      throw new NotFoundException(`VenueEquipment with ID ${id} not found`);
    }

    await this.venueEquipmentRepository.remove(venueEquipment);

    return { message: `VenueEquipment with ID ${id} has been successfully deleted.` };
  }
}