import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsNumber, IsObject, ValidateNested, IsOptional } from 'class-validator';

export class CreatePropertyDto {
  @IsObject({ message: 'events.property.name_valid_object' })  // Using translation key
  @IsNotEmpty({ message: 'events.property.name_required' })  // Using translation key
  name: { en: string, ar: string };

  @IsObject({ message: 'events.property.description_valid_object' })  // Using translation key
  @IsNotEmpty({ message: 'events.property.description_required' })  // Using translation key
  description: { en: string, ar: string };

  // @IsString({ message: 'events.property.file_string' })  // Uncomment if needed
  // @IsNotEmpty({ message: 'events.property.file_required' })  // Uncomment if needed
  file: string;

  // @IsNumber({}, { message: 'events.property.vendor_id_number' })  // Using translation key
  @IsNotEmpty({ message: 'events.property.vendor_id_required' })  // Using translation key
  vendor_id: any;

  // @IsNumber({}, { message: 'events.property.city_id_number' })  // Using translation key
  @IsNotEmpty({ message: 'events.property.city_id_required' })  // Using translation key
  city_id: any;

  @IsOptional()
  @IsNumber({}, { message: 'events.property.venue_id_number' })  // Using translation key
  venue_id: any;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
