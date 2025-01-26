// src/shared/shared.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'entity/media/media.entity';
import { City } from 'entity/property/city.entity';
import { Country } from 'entity/property/country.entity';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Property } from 'entity/property/property.entity';

@Global() // Make the module global
@Module({
  imports: [TypeOrmModule.forFeature([City , Country , Venue , User , Media , OccasionType , Property])],
  exports: [TypeOrmModule],
})
export class SharedModule {}