// src/city/city.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { BulkCreateCityDto, CreateCityDto, UpdateCityDto } from 'dto/property/city.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'entity/property/city.entity';
import { Repository } from 'typeorm';
import { Country } from 'entity/property/country.entity';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { I18nService } from 'nestjs-i18n';

@Controller('cities')
export class CityController {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly cityService: CityService,
    private readonly i18n: I18nService
  ) {}



  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.CITIES_CREATE)
  async create(@Body() dto: CreateCityDto) {
    await checkFieldExists(this.cityRepository, { name: dto.name }, this.i18n.t("events.city_name_unique" , {args : {cityName : dto.name}} )  );
    await checkFieldExists(this.countryRepository, { id: dto.country }, this.i18n.t("events.city_country_not_found" , {args : {countryId : dto.country}} )  , true);

    return this.cityService.create(dto);
  }




  @Post('bulk-create')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.CITIES_CREATE)
  async bulkCreate(@Body() dto: BulkCreateCityDto) {

    for (const city of dto.cities) {
      // Check if city name is unique
      await checkFieldExists(this.cityRepository, { name: city.name },  this.i18n.t("events.city_name_unique" , {args : {cityName : city.name}} ) ); //`The name ( ${} ) of the city should be unique. `

      // Check if the country exists
      await checkFieldExists(this.countryRepository, { id: city.country },  this.i18n.t("events.city_country_not_found" , {args : {countryId : city.country}} ) , true); //`Country with this ID ( ${} ) not found.`
    }

    return this.cityService.bulkCreate(dto);
  }




  @Get()
  // @UseGuards(AuthGuard)
  // @Permissions(EPermissions.CITIES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.cityService.FIND(
      'city',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [ "country" ],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  // @Permissions(EPermissions.CITIES_READ)
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id, ['country']);
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.CITIES_UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateCityDto) {
    await checkFieldExists(this.cityRepository, { name: dto.name }, this.i18n.t("events.city_name_unique" , {args : {cityName : dto.name}} )  );
    await checkFieldExists(this.countryRepository, { id: dto.country }, this.i18n.t("events.city_country_not_found" , {args : {countryId : dto.country}} )  , true);

    return this.cityService.update(+id, dto);
  }



  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.CITIES_DELETE)
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
