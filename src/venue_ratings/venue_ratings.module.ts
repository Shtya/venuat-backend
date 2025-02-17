import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueRating } from 'entity/venue/venue_ratings.entity';
import { VenueRatingController } from './venue_ratings.controller';
import { VenueRatingService } from './venue_ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([VenueRating])],
  controllers: [VenueRatingController],
  providers: [VenueRatingService],
})
export class VenueRatingModule {}

