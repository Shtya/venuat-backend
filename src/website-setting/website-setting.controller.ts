// src/controllers/website-setting.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateWebsiteSettingDto, UpdateWebsiteSettingDto } from 'dto/website/websiteSetting.dto';
import { WebsiteSettingService } from './website-setting.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'entity/media/media.entity';
import { Repository } from 'typeorm';
import { WebsiteSettings } from 'entity/website/website_settings.entity';

@Controller('website-settings')
export class WebsiteSettingController {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(WebsiteSettings)
    private readonly websiteRepository: Repository<Media>,
    private readonly websiteSettingService: WebsiteSettingService) {}

  @Post()
  async create(@Body() dto: CreateWebsiteSettingDto) {
    await checkFieldExists(this.mediaRepository , {id : dto.media_id } , "this media_id it doesn't exist." , true )
    
    const data = this.websiteRepository.create(dto as any );
      return this.websiteRepository.save(data);
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder } = query;
    return this.websiteSettingService.findAll(
      'website-settings',
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ['setting_key'] // search
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.websiteSettingService.findOne(id , ["media"]);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateWebsiteSettingDto: UpdateWebsiteSettingDto) {
    return this.websiteSettingService.update(id, updateWebsiteSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.websiteSettingService.remove(id);
  }
}
