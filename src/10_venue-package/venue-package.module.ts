import { Module } from '@nestjs/common';
import { VenuePackageService } from './venue-package.service';
import { VenuePackageController } from './venue-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import {VenuePackageService as Veneu_package_service } from"entity/venue/venue_package_service.entity"

@Module({
  imports : [TypeOrmModule.forFeature([VenuePackage , VenuePackageEquipment , Veneu_package_service])] ,
  controllers: [VenuePackageController],
  providers: [VenuePackageService],
})
export class VenuePackageModule {}
