import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';
import { Feature } from 'entity/venue/feature.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenueFeature } from 'entity/venue/venue_feature.entity';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

@Injectable()
export class VenueFeatureService {
  constructor(
    @InjectRepository(VenueFeature) private venueFeatureRepository: Repository<VenueFeature>,
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
    private readonly i18n: I18nService
  ) {}

  // 📌 إضافة ميزة إلى قاعة
  async addFeatureToVenue(venueId: number, addFeatureToVenueDto: AddFeatureToVenueDto): Promise<VenueFeature> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) throw new NotFoundException(this.i18n.t('events.venue_not_found', { args: { venueId } }));

    const feature = await this.featureRepository.findOne({
      where: { id: addFeatureToVenueDto.feature_id, deleted_at: null }, // تجنب الميزات المحذوفة
      relations: ['iconMedia'], // تحميل الأيقونة عند الحاجة
    });

    if (!feature) throw new NotFoundException(this.i18n.t('events.feature_not_found', { args: { featureId: addFeatureToVenueDto.feature_id } }));

    const venueFeature = this.venueFeatureRepository.create({ venue, feature });
    return this.venueFeatureRepository.save(venueFeature);
  }

  // 📌 إزالة ميزة من القاعة
  async removeFeatureFromVenue(venueId: number, featureId: number): Promise<{ message: string }> {
    const venueFeature = await this.venueFeatureRepository.findOne({
      where: { venue: { id: venueId }, feature: { id: featureId } },
    });

    if (!venueFeature) throw new NotFoundException(this.i18n.t('events.feature_not_found_for_venue', { args: { featureId, venueId } }));

    await this.venueFeatureRepository.remove(venueFeature);
    return { message: this.i18n.t('events.feature_removed_from_venue', { args: { featureId, venueId } }) };
  }

  // 📌 جلب جميع الميزات الخاصة بقاعة معينة
  async getFeaturesForVenue(venueId: number, lang: string): Promise<any[]> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) throw new NotFoundException(this.i18n.t('events.venue_not_found', { args: { venueId } }));

    const venueFeatures = await this.venueFeatureRepository.find({
      where: { venue: { id: venueId } },
      relations: ['feature', 'feature.iconMedia'], // تحميل تفاصيل الميزة والأيقونة
    });

    return venueFeatures;
  }
}
