import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';
import { Country } from 'entity/property/country.entity';
import { BulkCreateCountryDto } from 'dto/property/country.dto';

@Injectable()
export class CountryService extends BaseService<Country> {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>
  ) {
    super(countryRepository);
  }


  async bulkCreate(dto: BulkCreateCountryDto): Promise<any> {
    const countries = dto.countries.map(country => this.countryRepository.create(country));
    await this.countryRepository.save(countries);
    return { message: this.i18n.t("events.countries_added" ,{args : {count : countries.length}} ) };  
  }
}
