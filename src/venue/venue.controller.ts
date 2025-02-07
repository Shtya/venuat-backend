import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto, UpdateVenueDto } from 'dto/venue/venue.dto';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Repository } from 'typeorm';
import { Property } from 'entity/property/property.entity';
import { I18nService } from 'nestjs-i18n';

@Controller('venues')
export class VenueController {
  constructor(
    @InjectRepository(OccasionType)
    private occasionTypeRepository: Repository<OccasionType>,
    @InjectRepository(Property)
    private prpoertyRepo: Repository<Property>,
    private readonly venueService: VenueService ,
    private readonly i18n : I18nService
  ) {}

  @Post()
  async create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createCustom(createVenueDto);
  }

  //! add features
  @Post(':id/add-feature')
  async addFeatureToVenue(@Param('id') venueId: number, @Body() addFeatureToVenueDto: AddFeatureToVenueDto) {
    return this.venueService.addFeatureToVenue(venueId, addFeatureToVenueDto);
  }

  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    // return this.venueService.customFind()
    return this.venueService.FIND(
      'venue',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      this.venueService.relations,                // Relations 
      ["name" , "description" , "operating_system" ,"phone" ,"email" ,"contact_person" ],         // search parameters
      restQueryParams    // search with fields
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.venueService.findOne(id , this.venueService.relations);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateVenueDto) {
    dto.occasion && (await checkFieldExists(this.occasionTypeRepository, { id: dto.occasion }, this.i18n.t("events.venue.occasion_type_not_found") , true)); //!'Occasion type does not exist'
    dto.property && (await checkFieldExists(this.prpoertyRepo, { id: dto.property }, this.i18n.t("events.venue.property_not_found") , true)); //!'Property does not exist'
    

    return this.venueService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.venueService.remove(id);
  }
}
