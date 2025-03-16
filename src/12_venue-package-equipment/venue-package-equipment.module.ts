import { Module } from '@nestjs/common';
import { VenuePackageEquipmentService } from './venue-package-equipment.service';
import { VenuePackageEquipmentController } from './venue-package-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Equipment } from 'entity/venue/equipment.entity';
import { CommonModule } from 'common/common.module';
import { PackagePriceUpdate } from 'common/package-price-updater.service';

@Module({
  imports : [TypeOrmModule.forFeature([VenuePackageEquipment , VenuePackage , Equipment]) , CommonModule ] ,
  controllers: [VenuePackageEquipmentController],
  providers: [VenuePackageEquipmentService , PackagePriceUpdate],
})
export class VenuePackageEquipmentModule {}
