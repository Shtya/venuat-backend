import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto, UpdateVenueDto } from 'dto/venue/venue.dto';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { AddServiceToVenueDto } from 'dto/venue/service.dto';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  async create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  //! add features
  @Post(':id/add-feature')
  async addFeatureToVenue(@Param('id') venueId: number, @Body() addFeatureToVenueDto: AddFeatureToVenueDto) {
    return this.venueService.addFeatureToVenue(venueId, addFeatureToVenueDto);
  }


  @Get()
  async findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.venueService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.venueService.remove(id);
  }

}
