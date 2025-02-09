// src/venue-service/venue-service.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VenueServiceService } from './venue-service.service';
import { AddServiceToVenueDto } from 'dto/venue/service.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venues')
export class VenueServiceController {
  constructor(private readonly venueServiceService: VenueServiceService) {}

  //! add Service
  @Post(':id/add-service')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_SERVICE_CREATE)
  async addServiceToVenue(@Param('id') venueId: number, @Body() addServiceToVenueDto: AddServiceToVenueDto) {
    return this.venueServiceService.addServiceToVenue(venueId, addServiceToVenueDto);
  }

  //! Delete a service from a venue
  @Delete(':id/remove-service/:serviceId')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_SERVICE_DELETE)
  async removeServiceFromVenue(@Param('id') venueId: number, @Param('serviceId') serviceId: number) {
    return this.venueServiceService.removeServiceFromVenue(venueId, serviceId);
  }

  @Get(':id/services')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_SERVICE_READ)
  async getServicesForVenue(@Param('id') venueId: number) {
    return this.venueServiceService.getServicesForVenue(venueId);
  }
}
