// src/venue-equipment/venue-equipment.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { VenueEquipment } from 'entity/venue/venue_equipment.entity';
import { Equipment } from 'entity/venue/equipment.entity';
import { AddEquipmentsToVenueDto, AddEquipmentToVenueDto, UpdateVenueEquipmentDto } from 'dto/venue/equipment.dto';
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



  async addEquipmentsToVenue(venueId: number, dto: AddEquipmentsToVenueDto) {
    const venue = await this.venueRepository.findOne({
      where: { id: venueId },
      relations: ['venueEquipments'],
    });
  
    if (!venue) {
      throw new NotFoundException(this.i18n.t('events.venue.not_found', { args: { id: venueId } }));
    }
  
    const addedEquipments = [];
  
    for (const equipmentDto of dto.equipments) {
      const equipment = await this.equipmentRepository.findOne({ where: { id: equipmentDto.equipment_id } });
  
      if (!equipment) {
        throw new NotFoundException(
          this.i18n.t('events.equipment_not_found', { args: { equipmentId: equipmentDto.equipment_id } })
        );
      }
  
      // تحقق مما إذا كانت المعدات مضافة مسبقًا إلى هذا الـ Venue
      const existingVenueEquipment = venue.venueEquipments.find(vs => vs?.equipment?.id === equipment.id);
  
      if (existingVenueEquipment) {
        throw new NotFoundException(
          this.i18n.t('events.equipment.already_associated', {
            args: { equipmentId: equipment.id, venueId: venue.id },
          })
        );
      }
  
      // إنشاء العلاقة بين المكان والمعدات
      const venueEquipment = this.venueEquipmentRepository.create({
        venue,
        equipment,
        count: equipmentDto.count,
        price: equipmentDto.price,
        price_per: equipmentDto.price_per,
      });
  
      await this.venueEquipmentRepository.save(venueEquipment);
      addedEquipments.push(venueEquipment);
    }
  
    return addedEquipments;
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


    // src/venue-service/venue-service.service.ts
async updateVenueEquipments(venueId: number, dto) {
  const updatedServices = [];

  for (const equipmentDto of dto.equipments) {
    const { equipmentId , count, price } = equipmentDto;

    const venueService = await this.venueEquipmentRepository.findOne({
      where: { venue: { id: venueId }, id: equipmentId },
      relations: ['venue', 'equipment'],
    });

    if (!venueService) {
      throw new NotFoundException(
        this.i18n.t('events.equipment.not_found_for_venue', {
          args: { serviceId: equipmentId, venueId },
        }),
      );
    }

    // Update the count and price
    venueService.count = count;
    venueService.price = price;

    await this.venueEquipmentRepository.save(venueService);
    updatedServices.push(venueService);
  }

  return {
    message: this.i18n.t('events.updated', { args: { venueId } }),
    data: updatedServices,
  };
}

}
