// src/venue-equipment/venue-equipment.controller.ts
import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { VenueEquipmentService } from './venue-equipment.service';
import { AddEquipmentToVenueDto, UpdateVenueEquipmentDto } from 'dto/venue/equipment.dto';

@Controller('venue-equipment')
export class VenueEquipmentController {
  constructor(private readonly venueEquipmentService: VenueEquipmentService) {}

  @Post(':id/add-equipment')
  addEquipmentToVenue(@Param('id') venueId: number, @Body() addEquipmentToVenueDto: AddEquipmentToVenueDto) {
    return this.venueEquipmentService.addEquipmentToVenue(venueId, addEquipmentToVenueDto);
  }

  @Get(':id/equipment')
  async getEquipmentForVenue(@Param('id') venueId: number) {
    return this.venueEquipmentService.getEquipmentForVenue(venueId);
  }

  @Delete(':id')
  removeEquipmentFromVenue(@Param('id') id: number)  {
    return this.venueEquipmentService.removeEquipmentFromVenue(id);
  }
}
