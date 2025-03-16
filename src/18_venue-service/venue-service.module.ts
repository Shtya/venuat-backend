// src/venue-service/venue-service.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueServiceService } from './venue-service.service';
import { VenueServiceController } from './venue-service.controller';
import { VenueService } from 'entity/venue/venue_service.entity';
import { Venue } from 'entity/venue/venue.entity';
import { Service } from 'entity/venue/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueService, Venue, Service])],
  providers: [VenueServiceService],
  controllers: [VenueServiceController],
})
export class VenueServiceModule {}
