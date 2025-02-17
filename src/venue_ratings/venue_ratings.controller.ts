import { Controller, Post, Body, Param, Delete, Get, Put, UseGuards, Req, Query } from '@nestjs/common';
import { CreateVenueRatingDto, UpdateVenueRatingDto } from 'dto/venue/venue_ratings.dto';
import { EPermissions } from 'enums/Permissions.enum';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { VenueRatingService } from './venue_ratings.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';
import { VenueRating } from 'entity/venue/venue_ratings.entity';

@Controller('venue-ratings')
export class VenueRatingController {
  constructor(
    @InjectRepository(Venue) readonly venueRepository: Repository<VenueRating>,
    private readonly venueRatingService: VenueRatingService) {}
    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() dto: CreateVenueRatingDto, @Req() req) {
      return this.venueRatingService.createCustom(dto, req.user.id);
    }
  

    @Get()
    async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.venueRatingService.FIND(
      'countries',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ['venue', 'user'],                // Relations 
      ["rating" ],         // search parameters
      restQueryParams    // search with fields
    );
  }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.venueRatingService.findOne(id , ['venue', 'user']);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateVenueRatingDto) {
      return this.venueRatingService.update( id ,dto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number) {
      return this.venueRatingService.remove(id);
    }
}
