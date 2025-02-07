import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueGalleryController } from './venue-gallery.controller';
import { VenueGallery } from 'entity/venue/venue_gallery.entity';
import { VenueGalleryService } from './venue-gallery.service';

@Module({
  imports: [TypeOrmModule.forFeature([VenueGallery])],
  controllers: [VenueGalleryController],
  providers: [VenueGalleryService],
})
export class VenueGalleryModule {}
