// src/city/city.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkCreateCityDto, UpdateCityDto } from 'dto/property/city.dto';
import { City } from 'entity/property/city.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>
  ) {
    super(cityRepository);
  }

  async updateCustom(id: any, createCityDto: UpdateCityDto) {
    const city = await this.cityRepository.update(id, createCityDto);
    if (!city.affected) {
      throw new NotFoundException( this.i18n.t("events.city_not_found" , {args : {city_id : id }}) ); 
    }
    return this.cityRepository.findOne(id);
  }


  async bulkCreate(dto: BulkCreateCityDto): Promise<any> {
    const cities = dto.cities.map(city => this.cityRepository.create(city));
    await this.cityRepository.save(cities);
    return { message:  this.i18n.t("events.cities_added_successfully" , {args : {citiesCount : cities.length }})  }
  }

}
