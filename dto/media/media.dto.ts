import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsOptional,
  IsJSON,
} from 'class-validator';

export class CreateMediaDto {
  @IsNumberString({}, { message: 'events.model_id_invalid' })
  @IsNotEmpty({ message: 'events.model_id_required' })
  model_id: string | number;

  @IsString({ message: 'events.name_invalid' })
  @IsNotEmpty({ message: 'events.name_required' })
  name: string;

  @IsString({ message: 'events.file_name_invalid' })
  @IsOptional()
  file_name?: string;

  @IsString({ message: 'events.mime_type_invalid' })
  @IsOptional()
  mime_type?: string;

  @IsString({ message: 'events.disk_invalid' })
  @IsOptional()
  disk?: string;

  @IsNumberString({}, { message: 'events.size_invalid' })
  @IsOptional()
  size?: string | number;

  @IsJSON({ message: 'events.manipulations_invalid' })
  @IsOptional()
  manipulations?: Record<string, any>;

  @IsJSON({ message: 'events.custom_properties_invalid' })
  @IsOptional()
  custom_properties?: Record<string, any>;

  @IsNumberString({}, { message: 'events.order_invalid' })
  @IsNotEmpty({ message: 'events.order_required' })
  order: string | number;
}

export class UploadQueryDto {
  @IsString({ message: 'events.folder_invalid' })
  @IsNotEmpty({ message: 'events.folder_required' })
  folder: string;

  @IsString({ message: 'events.collection_invalid' })
  @IsNotEmpty({ message: 'events.collection_required' })
  collection: string;
}

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
