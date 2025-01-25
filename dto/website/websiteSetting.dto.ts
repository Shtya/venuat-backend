// src/dto/create-website-setting.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsJSON, IsObject } from 'class-validator';

export class CreateWebsiteSettingDto {
  @IsString()
  @IsNotEmpty()
  setting_key: string; // e.g., "background_image"

  @IsObject()
  @IsOptional()
  setting_value?: any; // e.g., {"color": "red", "size": "large"}

  @IsOptional()
  media_id?: number; // Reference to media table (optional)
}


export class UpdateWebsiteSettingDto extends PartialType(CreateWebsiteSettingDto) {}

