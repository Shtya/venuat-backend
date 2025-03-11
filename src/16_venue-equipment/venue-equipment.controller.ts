// src/venue-equipment/venue-equipment.controller.ts
import { Controller, Post, Body, Param, Put, Delete, Get, UseGuards } from '@nestjs/common';
import { VenueEquipmentService } from './venue-equipment.service';
import { AddEquipmentsToVenueDto, AddEquipmentToVenueDto } from 'dto/venue/equipment.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-equipment')
export class VenueEquipmentController {
  constructor(private readonly venueEquipmentService: VenueEquipmentService) {}


  @Post(':id/add-equipment')
  @UseGuards(AuthGuard)
  // @Permissions(EPermissions.VENUE_EQUIPMENT_CREATE)
  addEquipmentToVenue(@Param('id') venueId: number, @Body() addEquipmentToVenueDto: AddEquipmentToVenueDto) {
    return this.venueEquipmentService.addEquipmentToVenue(venueId, addEquipmentToVenueDto);
  }

  @Post(':id/add-equipments')
  @UseGuards(AuthGuard)
  // @Permissions(EPermissions.VENUE_EQUIPMENT_CREATE)
  async addEquipmentsToVenue(@Param('id') venueId: number, @Body() addEquipmentToVenueDto: AddEquipmentsToVenueDto) {
    return this.venueEquipmentService.addEquipmentsToVenue(venueId, addEquipmentToVenueDto);
  }




  @Get(':id/equipment')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_EQUIPMENT_READ)
  async getEquipmentForVenue(@Param('id') venueId: number) {
    return this.venueEquipmentService.getEquipmentForVenue(venueId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_EQUIPMENT_DELETE)
  removeEquipmentFromVenue(@Param('id') id: number) {
    return this.venueEquipmentService.removeEquipmentFromVenue(id);
  }


    //! updates a lot of services 
  // src/venue-service/venue-service.controller.ts
  @Put(':id/equipments')
  async updateVenueEquipments(
    @Param('id') venueId: number,
    @Body() updateVenueEquipmentsDto,
  ) {
    return this.venueEquipmentService.updateVenueEquipments(venueId, updateVenueEquipmentsDto);
  }

}
