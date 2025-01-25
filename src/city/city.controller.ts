// src/city/city.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto , UpdateCityDto } from 'dto/property/city.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'entity/property/city.entity';
import { Repository } from 'typeorm';
import { Country } from 'entity/property/country.entity';

@Controller('cities')
export class CityController {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City> ,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country> ,

    private readonly cityService: CityService) {}

  @Post()
  async create(@Body() dto: CreateCityDto) {
    await checkFieldExists(this.cityRepository , {name : dto.name } , "the name of city should be unique.")
    await checkFieldExists(this.countryRepository , {id : dto.country } , "Country with this ID not found." , true )

    return this.cityService.create(dto);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , name  } = query;
    return this.cityService.findAll(
      "city" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name"], // search
      { name },       // filer
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id , ["country", "properties"]);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}