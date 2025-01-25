// src/media/dto/create-media.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsOptional,
  IsJSON,
} from 'class-validator';

export class CreateMediaDto {
  @IsNumberString({}, { message: 'Model ID must be a number or a string representing a number.' })
  @IsNotEmpty({ message: 'Model ID is required.' })
  model_id: string | number;

  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsString({ message: 'File name must be a string.' })
  @IsOptional() // Make file_name optional
  file_name?: string;

  @IsString({ message: 'MIME type must be a string.' })
  @IsOptional() // Make mime_type optional
  mime_type?: string;

  @IsString({ message: 'Disk must be a string.' })
  @IsOptional() // Make disk optional
  disk?: string;

  @IsNumberString({}, { message: 'Size must be a number or a string representing a number.' })
  @IsOptional() // Make size optional
  size?: string | number;

  @IsJSON({ message: 'Manipulations must be a valid JSON object.' })
  @IsOptional() // Make manipulations optional
  manipulations?: Record<string, any>;

  @IsJSON({ message: 'Custom properties must be a valid JSON object.' })
  @IsOptional() // Make custom_properties optional
  custom_properties?: Record<string, any>;

  @IsNumberString({}, { message: 'Order must be a number or a string representing a number.' })
  @IsNotEmpty({ message: 'Order is required.' })
  order: string | number;
}

export class UploadQueryDto {
  @IsString({ message: 'Folder must be a string.' })
  @IsNotEmpty({ message: 'Folder query is required.' })
  folder: string;

  @IsString({ message: 'Collection must be a string.' })
  @IsNotEmpty({ message: 'collection query is required.' })
  collection: string;
}

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}

