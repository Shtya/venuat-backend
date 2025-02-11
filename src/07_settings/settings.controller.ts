import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CreateWebsiteSettingsDto, UpdateWebsiteSettingsDto } from 'dto/website/websiteSetting.dto';
import { WebsiteSettings } from 'entity/website/website_settings.entity';
import { WebsiteSettingsService } from './settings.service';

@Controller('website-settings')
export class WebsiteSettingsController {
  constructor(private readonly websiteSettingsService: WebsiteSettingsService) {}

  @Post()
  async create(@Body() createWebsiteSettingsDto: CreateWebsiteSettingsDto): Promise<WebsiteSettings> {
    return await this.websiteSettingsService.createCustom(createWebsiteSettingsDto);
  }

  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.websiteSettingsService.FIND(
      'websiteSettings',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      [],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  async findOne(@Param('id') id: number)  {
    return this.websiteSettingsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateWebsiteSettingsDto: UpdateWebsiteSettingsDto): Promise<WebsiteSettings> {
    const websiteSettings = await this.websiteSettingsService.findOne(id);
    if (!websiteSettings) {
      throw new NotFoundException(this.websiteSettingsService.i18n.t('events.website_settings_not_found', { args: { id } }));
    }
    return await this.websiteSettingsService.updateCustom(id, updateWebsiteSettingsDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number) {
     return this.websiteSettingsService.remove(+id);
  }
}
