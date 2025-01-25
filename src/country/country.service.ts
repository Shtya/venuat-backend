import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';
import { Country } from 'entity/property/country.entity';

@Injectable()
export class CountryService extends BaseService<Country> {
  constructor(
    @InjectRepository(Country)
    private CountryRepository: Repository<Country>,
  ) {
    super(CountryRepository)
  }


}