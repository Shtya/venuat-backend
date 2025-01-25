import { Module } from '@nestjs/common';
import { WebsiteSettingService } from './website-setting.service';
import { WebsiteSettingController } from './website-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteSettings } from 'entity/website/website_settings.entity';

@Module({
  imports : [TypeOrmModule.forFeature([WebsiteSettings])] ,
  controllers: [WebsiteSettingController],
  providers: [WebsiteSettingService],
})
export class WebsiteSettingModule {}
