import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteSettings } from 'entity/website/website_settings.entity';
import { WebsiteSettingsController } from './settings.controller';
import { WebsiteSettingsService } from './settings.service';


@Module({
  imports : [TypeOrmModule.forFeature([WebsiteSettings])] ,
  controllers: [WebsiteSettingsController],
  providers: [WebsiteSettingsService],
})
export class SettingsModule {}

