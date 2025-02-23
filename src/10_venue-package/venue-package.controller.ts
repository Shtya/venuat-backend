import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { VenuePackageService } from './venue-package.service';
import { CreateVenuePackageDto, UpdateVenuePackageDto } from 'dto/venue/venue_package.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-packages')
export class VenuePackageController {
  constructor(
    private readonly venuePackageService: VenuePackageService) {}


  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_CREATE)
  async create(@Body() dto: CreateVenuePackageDto , @Req() req) {
    return this.venuePackageService.customCreate(dto , req)
  }



  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.venuePackageService.FIND(
      'venue_packages',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ["services" , "equipments"],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get('/:venue_id/venue')
  async getVenuePackages(@Param('venue_id') venue_id: number) {
    return this.venuePackageService.getForVenue(venue_id)
  }



  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venuePackageService.findOne(id , ["services"  , "equipments"  ]);
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_UPDATE)
  update(@Param('id') id: number, @Body() dto: UpdateVenuePackageDto) {
    return this.venuePackageService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_DELETE)
  delete(@Param('id') id: number) {
    return this.venuePackageService.remove(id);
  }
}
