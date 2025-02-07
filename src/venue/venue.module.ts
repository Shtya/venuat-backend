// src/venue/venue.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { Venue } from 'entity/venue/venue.entity';
import { Feature } from 'entity/venue/feature.entity';
import { VenueFeature } from 'entity/venue/venue_feature.entity';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Service } from 'entity/venue/service.entity';
import { VenueService as VenueServiceEntity } from 'entity/venue/venue_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, Feature, VenueFeature, OccasionType, Service, VenueServiceEntity])],
  providers: [VenueService],
  controllers: [VenueController],
})
export class VenueModule {}
