// src/countries/countries.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { BulkCreateCountryDto, CreateCountryDto, UpdateCountryDto } from 'dto/property/country.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'entity/property/country.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { I18nService } from 'nestjs-i18n';

@Controller('countries')
export class CountriesController {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    private readonly countriesService: CountryService ,
    private readonly i18n: I18nService,
  ) {}


  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_CREATE)
  async create(@Body() dto: CreateCountryDto) {
    await checkFieldExists(this.countryRepository, { name: dto.name }, this.i18n.t("events.country_name_unique") );
    return this.countriesService.create(dto);
  }



  @Post('bulk-create')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_CREATE)
  async bulkCreate(@Body() dto: BulkCreateCountryDto) {
    for (const country of dto.countries) {
      await checkFieldExists(this.countryRepository, { name: country.name }, this.i18n.t("events.country_name_unique_with_value" , {args : {name : country.name}}) );
    }

    return this.countriesService.bulkCreate(dto);
  }



  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.countriesService.FIND(
      'countries',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_READ)
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }



  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_UPDATE)
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(+id, updateCountryDto);
  }


  

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.COUNTRIES_DELETE)
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
