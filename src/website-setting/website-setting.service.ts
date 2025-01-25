// src/services/website-setting.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebsiteSettings } from 'entity/website/website_settings.entity';
import { UpdateWebsiteSettingDto , CreateWebsiteSettingDto } from 'dto/website/websiteSetting.dto';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class WebsiteSettingService extends BaseService<WebsiteSettings> {
  constructor(
    @InjectRepository(WebsiteSettings)
    private readonly websiteSettingRepository: Repository<WebsiteSettings>,
  ) {
    super(websiteSettingRepository);
  }

  // // Create a new setting
  // async create(createWebsiteSettingDto: CreateWebsiteSettingDto) {
  //   const setting = this.websiteSettingRepository.create(createWebsiteSettingDto);
  //   return this.websiteSettingRepository.save(setting);
  // }

  // // Find all settings
  // async findAll() {
  //   return this.websiteSettingRepository.find();
  // }

  // // Find a setting by ID
  // async findOne(id: number) {
  //   const setting = await this.websiteSettingRepository.findOne({ where: { id } });
  //   if (!setting) {
  //     throw new NotFoundException(`Setting with ID ${id} not found.`);
  //   }
  //   return setting;
  // }

  // // Update a setting by ID
  // async update(id: number, updateWebsiteSettingDto: UpdateWebsiteSettingDto) {
  //   const setting = await this.findOne(id);
  //   Object.assign(setting, updateWebsiteSettingDto);
  //   return this.websiteSettingRepository.save(setting);
  // }

  // // Delete a setting by ID
  // async remove(id: number) {
  //   const setting = await this.findOne(id);
  //   return this.websiteSettingRepository.remove(setting);
  // }
}