import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'entity/property/country.entity';
import { CountriesController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountryModule {}
