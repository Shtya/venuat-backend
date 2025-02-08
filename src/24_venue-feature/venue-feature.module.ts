import { Module } from '@nestjs/common';
import { VenueFeatureService } from './venue-feature.service';
import { VenueFeatureController } from './venue-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueFeature } from 'entity/venue/venue_feature.entity';
import { Feature } from 'entity/venue/feature.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([VenueFeature , Feature]) ],
  exports: [VenueFeatureService],
  controllers: [VenueFeatureController],
  providers: [VenueFeatureService],
})
export class VenueFeatureModule {}
