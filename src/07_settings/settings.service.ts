import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebsiteSettingsDto, UpdateWebsiteSettingsDto } from 'dto/website/websiteSetting.dto';
import { WebsiteSettings } from 'entity/website/website_settings.entity';
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class WebsiteSettingsService extends BaseService<WebsiteSettings> {
  constructor(
    @InjectRepository(WebsiteSettings)
    private readonly websiteSettingsRepository: Repository<WebsiteSettings>
  ) {
    super(websiteSettingsRepository);
  }

  async createCustom(createWebsiteSettingsDto: CreateWebsiteSettingsDto): Promise<WebsiteSettings> {
    const pagesWithIds = createWebsiteSettingsDto.pages.map(page => ({
      ...page,
      id: uuidv4(),
    }));

    const faqsWithIds = createWebsiteSettingsDto.faqs.map(faq => ({
      ...faq,
      id: uuidv4(),
    }));

    const newWebsiteSettings = this.websiteSettingsRepository.create({
      ...createWebsiteSettingsDto,
      pages: pagesWithIds,
      faqs: faqsWithIds,
    });

    return await this.websiteSettingsRepository.save(newWebsiteSettings);
  }

  async updateCustom(id: number, updateWebsiteSettingsDto: UpdateWebsiteSettingsDto): Promise<WebsiteSettings> {
    const websiteSettings = await this.websiteSettingsRepository.findOne({ where: { id } });
    if (!websiteSettings) {
      throw new NotFoundException(this.i18n.t('events.website_settings_not_found', { args: { id } }));
    }

    if (updateWebsiteSettingsDto.pages) {
      updateWebsiteSettingsDto.pages = updateWebsiteSettingsDto.pages.map(page => ({
        ...page,
        id: page.id || uuidv4(),
      }));
    }

    if (updateWebsiteSettingsDto.faqs) {
      updateWebsiteSettingsDto.faqs = updateWebsiteSettingsDto.faqs.map(faq => ({
        ...faq,
        id: faq.id || uuidv4(),
      }));
    }

    const updatedWebsiteSettings = Object.assign(websiteSettings, updateWebsiteSettingsDto);
    return await this.websiteSettingsRepository.save(updatedWebsiteSettings);
  }
}
