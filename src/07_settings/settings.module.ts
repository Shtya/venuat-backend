import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeSettings } from 'entity/website/website_settings.entity';
import { HomeSettingsController } from './settings.controller';
import { HomeSettingsService } from './settings.service';


@Module({
  imports : [TypeOrmModule.forFeature([HomeSettings])] ,
  controllers: [HomeSettingsController],
  providers: [HomeSettingsService],
})
export class SettingsModule {}

