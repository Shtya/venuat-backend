import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateHomeSettingsDto, CreateFaqDto, UpdateFaqDto, CreateSocialMediaDto, UpdateSocialMediaDto, CreateHomeSettingsDto } from 'dto/website/websiteSetting.dto';
import { HomeSettingsService } from './settings.service';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('settings')
export class HomeSettingsController {
  constructor(private readonly homeSettingsService: HomeSettingsService) {}


  @Get()
  // @UseGuards(AuthGuard)
  // @Permissions(EPermissions.WEBSITE_SETTINGS_READ)
  getSettings() {
    return this.homeSettingsService.getSettings();
  }

  @Put()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_UPDATE)
  updateSettings(@Body() dto: UpdateHomeSettingsDto) {
    return this.homeSettingsService.createOrUpdate(dto);
  }

  @Post('faq')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_CREATE)
  addFaq(@Body() dto: CreateFaqDto) {
    return this.homeSettingsService.addFaq(dto);
  }

  @Delete('faq/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_DELETE)
  removeFaq(@Param('id') id: string) {
    return this.homeSettingsService.removeFaq(id);
  }

  @Post('policy')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_CREATE)
  addPolicies(@Body() dto) {
    return this.homeSettingsService.addPolicies(dto);
  }

  @Delete('policy/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_DELETE)
  removePolicies(@Param('id') id: string) {
    return this.homeSettingsService.removePolicies(id);
  }



}
