// src/venue-service/venue-service.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VenueServiceService } from './venue-service.service';
import { AddServiceToVenueDto, CreateVenueServiceDto, UpdateVenueServiceDto } from 'dto/venue/service.dto';

@Controller('venues')
export class VenueServiceController {
  constructor(private readonly venueServiceService: VenueServiceService) {}

  //! add Service
  @Post(':id/add-service')
  async addServiceToVenue(@Param('id') venueId: number, @Body() addServiceToVenueDto: AddServiceToVenueDto) {
    return this.venueServiceService.addServiceToVenue(venueId, addServiceToVenueDto);
  }

  //! Delete a service from a venue
  @Delete(':id/remove-service/:serviceId')
  async removeServiceFromVenue(
    @Param('id') venueId: number,
    @Param('serviceId') serviceId: number,
  ) {
    return this.venueServiceService.removeServiceFromVenue(venueId, serviceId);
  }

  @Get(':id/services')
  async getServicesForVenue(@Param('id') venueId: number) {
    return this.venueServiceService.getServicesForVenue(venueId);
  }
}
