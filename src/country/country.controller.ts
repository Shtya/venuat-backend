// src/countries/countries.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from 'dto/property/country.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'entity/property/country.entity';
import { Repository } from 'typeorm';

@Controller('countries')
export class CountriesController {
  constructor(
    @InjectRepository(Country)
        private CountryRepository: Repository<Country>,
    private readonly countriesService: CountryService
  ) {}

  @Post()
  async create(@Body() dto: CreateCountryDto) {
    await checkFieldExists(this.CountryRepository , {name : dto.name } , "the name of country should be unique.")
    return this.countriesService.create(dto);
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, name } = query;
    return this.countriesService.findAll(
      'countries',
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ['name'], // search
      { name } // filer
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
