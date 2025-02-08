import { Module } from '@nestjs/common';
import { VenueCalendarService } from './venue-calendar.service';
import { VenueCalendarController } from './venue-calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VenueCalendar } from 'entity/venue/venue_calendar.entity';
import { Venue } from 'entity/venue/venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueCalendar, Venue])],
  controllers: [VenueCalendarController],
  providers: [VenueCalendarService],
})
export class VenueCalendarModule {}
