import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto, UpdateVenueDto } from 'dto/venue/venue.dto';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Repository } from 'typeorm';
import { Property } from 'entity/property/property.entity';
import { I18nService } from 'nestjs-i18n';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

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
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUES_CREATE)
  async create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createCustom(createVenueDto);
  }



  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, occasion, sortBy, sortOrder, ...restQueryParams }  = query  ;

    let occasionIds: number | number[] | undefined;

    if (occasion) {
      if (Array.isArray(occasion)) {
        // If occasion is an array, convert each item to a number
        occasionIds = occasion.map(id => Number(id));
      } else {
        // If occasion is a single value, convert it to a number
        occasionIds = Number(occasion);
      }
    }


    return   this.venueService.FIND(
      'venue',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      this.venueService.relations,                // Relations 
      ["name" , "description" , "operating_system" ,"phone" ,"email" ,"contact_person" ],         // search parameters
      restQueryParams,    // search with fields
      true ,
      "",
      occasionIds
    )
  }


  @Get("find-all")
  async findAll2(@Query() query) {
    const {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      visitor,
      city,
      occasion,
      startOccasion,
      mostVisited,
      highestRated,
      newest,
      minPrice, // New: Minimum price
      maxPrice, // New: Maximum price
      ...restQueryParams
    } = query;

    let occasionIds: number | number[] | undefined;

    if (occasion) {
      if (Array.isArray(occasion)) {
        occasionIds = occasion.map(id => Number(id));
      } else {
        occasionIds = Number(occasion);
      }
    }

    return this.venueService.customFind(
      'venue',
      page,
      limit,
      sortBy,
      sortOrder,
      undefined, // fieldsExclude
      visitor ? Number(visitor) : undefined,
      city ? Number(city) : undefined,
      occasionIds ,
      startOccasion,
      mostVisited === 'true',
      highestRated === 'true',
      newest === 'true',
      minPrice ? Number(minPrice) : undefined, 
      maxPrice ? Number(maxPrice) : undefined 
    );
  }



  @Get(':id')
  async findOne(@Param('id') id: number , @Query("packageId") packageId : number ) {
    return  this.venueService.customFindOne(id , packageId)
  }
  
  @Get(':id/detials-venue')
  async findOneDetailsVenue(@Param('id') id: number ) {
    return  this.venueService.findOneDetailsVenue(id )
  }
  
  @Get(':id/reservation-venue')
  async findOneReservationVenue(@Param('id') id: number  , @Query("packageId") packageId : number  ) {
    return  this.venueService.findOneReservationVenue(id , packageId )
  }




  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUES_UPDATE)
  async update(@Param('id') id: number, @Body() dto: UpdateVenueDto) {
    dto.occasion && (await checkFieldExists(this.occasionTypeRepository, { id: dto.occasion }, this.i18n.t("events.venue.occasion_type_not_found") , true)); //!'Occasion type does not exist'
    dto.property && (await checkFieldExists(this.prpoertyRepo, { id: dto.property }, this.i18n.t("events.venue.property_not_found") , true)); //!'Property does not exist'
    
    return this.venueService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUES_DELETE)
  async remove(@Param('id') id: number) {
    return this.venueService.remove(id);
  }
}
