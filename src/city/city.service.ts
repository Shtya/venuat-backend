// src/city/city.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto , UpdateCityDto } from 'dto/property/city.dto';
import { City } from 'entity/property/city.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {
    super(cityRepository)
  }


  async updateCustom(id : any , createCityDto: UpdateCityDto)  {
    const city = await this.cityRepository.update(id, createCityDto)
    if (!city.affected) {
      throw new NotFoundException('City not found');
    }
    return this.cityRepository.findOne(id);
  }

}