import { Controller, Get, Post, Param, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { VenueFeatureService } from './venue-feature.service';
import { AuthGuard } from 'src/1_auth/auth.guard';
import { Permissions } from 'src/1_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { AddFeatureToVenueDto } from 'dto/venue/feature.dto';

@Controller('venues')
export class VenueFeatureController {
  constructor(private readonly venueFeatureService: VenueFeatureService) {}

  // 📌 إضافة ميزة إلى قاعة
  @Post(':id/add-feature')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FEATURE_CREATE)
  async addFeatureToVenue(@Param('id') venueId: number, @Body() addFeatureToVenueDto: AddFeatureToVenueDto) {
    return this.venueFeatureService.addFeatureToVenue(venueId, addFeatureToVenueDto);
  }

  // 📌 إزالة ميزة من قاعة
  @Delete(':id/remove-feature/:featureId')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FEATURE_DELETE)
  async removeFeatureFromVenue(@Param('id') venueId: number, @Param('featureId') featureId: number): Promise<{ message: string }> {
    return this.venueFeatureService.removeFeatureFromVenue(venueId, featureId);
  }

  // 📌 جلب جميع الميزات الخاصة بقاعة معينة
  @Get(':id/features')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FEATURE_READ)
  async getFeaturesForVenue(@Param('id') venueId: number, @Query('lang') lang: string = 'en'): Promise<any[]> {
    return this.venueFeatureService.getFeaturesForVenue(venueId, lang);
  }
}
