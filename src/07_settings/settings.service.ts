import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateHomeSettingsDto, CreateFaqDto, UpdateFaqDto, CreateSocialMediaDto, UpdateSocialMediaDto, CreateHomeSettingsDto } from 'dto/website/websiteSetting.dto';
import { HomeSettings } from 'entity/website/website_settings.entity';
import { v4 as uuidv4 } from 'uuid';
import { Venue } from 'entity/venue/venue.entity';

@Injectable()
export class HomeSettingsService {
  constructor(
    @InjectRepository(HomeSettings) private readonly homeSettingsRepo: Repository<HomeSettings>,
    @InjectRepository(Venue) private readonly venueRepo: Repository<Venue>
  ) {}

  async getSettings() {
    let settings = await this.homeSettingsRepo.findOne({ where: { id: 1 } });

    if (!settings) {
      settings = this.homeSettingsRepo.create({
        id: 1, // تأكيد أن المعرف دائمًا 1
        titleHome: { ar: null, en: null },
        secondTitleHome: { ar: null, en: null },
        urlVideo: null,
        specialVenues: [],
        bestRatedVenues: [],
        faqs: [],
        termsAndCondition: { ar: null, en: null },
        socialMedia: [],
      });

      settings = await this.homeSettingsRepo.save(settings);
    }

    const specialVenues = settings.specialVenues?.length ? await this.venueRepo.find({ where: { id: In(settings.specialVenues) }, relations: [ "ratings" , "occasion" , "venueGalleries" , "property", "property.city", "property.city.country"]}): [];

    const bestRatedVenues = settings.bestRatedVenues?.length ? await this.venueRepo.find({ where: { id: In(settings.bestRatedVenues) }, relations: [ "ratings" , "occasion" , "venueGalleries" , "property", "property.city", "property.city.country"]}): [];

    return {
        settings,
        specialVenues,
        bestRatedVenues,
    };
  }

  async createOrUpdate(dto: CreateHomeSettingsDto) {
    let settings = await this.homeSettingsRepo.findOne({ where: { id: 1 } });

    // إذا لم يكن موجودًا، نقوم بإنشائه مع قيم `null`
    if (!settings) {
      settings = this.homeSettingsRepo.create({
        id: 1,
        titleHome: { ar: null, en: null },
        secondTitleHome: { ar: null, en: null },
        urlVideo: null,
        specialVenues: [],
        bestRatedVenues: [],
        faqs: [],
        termsAndCondition: { ar: null, en: null },
        socialMedia: [],
      });
      settings = await this.homeSettingsRepo.save(settings);
    }

    if (dto.faqs) {
      dto.faqs = dto.faqs.map(faq => ({
        id: faq.id || uuidv4(),
        ...faq,
      }));
    }

    if (dto.specialVenues?.length) {
      const foundVenues = await this.venueRepo.findBy({ id: In(dto.specialVenues) });
      const foundVenueIds = new Set(foundVenues.map(venue => venue.id));
      const invalidSpecialVenues = dto.specialVenues.filter(id => !foundVenueIds.has(id));

      if (invalidSpecialVenues.length > 0) {
        throw new BadRequestException(`Invalid special venue IDs: ${invalidSpecialVenues.join(', ')}`);
      }

      dto.specialVenues = Array.from(foundVenueIds);
    }

    if (dto.bestRatedVenues?.length) {
      const foundVenues = await this.venueRepo.findBy({ id: In(dto.bestRatedVenues) });
      const foundVenueIds = new Set(foundVenues.map(venue => venue.id));
      const invalidBestRatedVenues = dto.bestRatedVenues.filter(id => !foundVenueIds.has(id));

      if (invalidBestRatedVenues.length > 0) {
        throw new BadRequestException(`Invalid best-rated venue IDs: ${invalidBestRatedVenues.join(', ')}`);
      }

      dto.bestRatedVenues = Array.from(foundVenueIds);
    }

    Object.assign(settings, dto); // تحديث القيم في السجل الموجود
    return this.homeSettingsRepo.save(settings);
  }

  async addFaq(dto: CreateFaqDto) {
    const {settings} = await this.getSettings();

    const newFaq = {
      id: uuidv4(), // إنشاء ID فريد
      ...dto,
    };

    settings.faqs.push(newFaq);
    return this.homeSettingsRepo.save(settings);
  }

  async removeFaq(id: string): Promise<HomeSettings> {
    const {settings} = await this.getSettings();

    const faqIndex = settings.faqs.findIndex(faq => faq.id === id);
    if (faqIndex === -1) {
      throw new NotFoundException('FAQ not found');
    }

    settings.faqs.splice(faqIndex, 1);
    return this.homeSettingsRepo.save(settings);
  }
}
