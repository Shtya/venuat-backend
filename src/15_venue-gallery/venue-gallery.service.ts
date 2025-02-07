import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateVenueGalleryDto, UpdateVenueGalleryDto } from 'dto/venue/venue_gallery.dto';
import { VenueGallery } from 'entity/venue/venue_gallery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenueGalleryService extends BaseService<VenueGallery> {
  constructor(
    @InjectRepository(VenueGallery)
    private readonly venueGalleryRepo: Repository<VenueGallery>,
  ) {
    super(venueGalleryRepo);
  }



  async addGalleryImages(dto: CreateVenueGalleryDto) {
    const { venue_id, imgs } = dto;

    const galleryEntries = imgs.map((img) => ({
      venue_id,
      imgs: [img], // Store each image separately
    }));

    return await this.venueGalleryRepo.save(galleryEntries);
  }

  async getGalleryByVenue(venueId: number) {
    return this.venueGalleryRepo.find({ where: { venue_id: venueId } });
  }


  async updateGallery(id: number, dto: UpdateVenueGalleryDto) {
    const gallery = await this.venueGalleryRepo.findOne({ where: { id } });
  
    if (!gallery) {
      throw new NotFoundException(this.i18n.t("events.gallery_not_found", { args: { id } }));
    }
  
    const updatedGallery = { ...gallery, ...dto };
    return this.venueGalleryRepo.save(updatedGallery);
  }

}
