import { Module } from '@nestjs/common';
import { VenuePackageServiceService } from './venue-package-service.service';
import { VenuePackageServiceController } from './venue-package-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'entity/venue/service.entity';
import { CommonModule } from 'common/common.module';
import { PackagePriceUpdate } from 'common/package-price-updater.service';

@Module({
  imports : [TypeOrmModule.forFeature([Service]) , CommonModule ] ,
  controllers: [VenuePackageServiceController  ],
  providers: [VenuePackageServiceService , PackagePriceUpdate],
})
export class VenuePackageServiceModule {}
