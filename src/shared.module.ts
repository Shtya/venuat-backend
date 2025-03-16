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
import { Permission } from 'entity/permission/permissions.entity';
import { Role } from 'entity/permission/role.entity';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackageService } from 'entity/venue/venue_package_service.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';

@Global() // Make the module global
@Module({
  imports: [TypeOrmModule.forFeature([City, Role, Country, Venue, User, Media, OccasionType, Property, Permission ,VenuePackage, VenuePackageService, VenuePackageEquipment])],
  exports: [TypeOrmModule],
})
export class SharedModule {}
