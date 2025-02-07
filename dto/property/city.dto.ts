import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsArray, ValidateNested } from 'class-validator';

export class CreateCityDto {
  @IsString({ message: 'events.city.name_string' }) // Updated with translation key
  @IsNotEmpty({ message: 'events.city.name_required' }) // Updated with translation key
  name: string;

  @IsNotEmpty({ message: 'events.city.country_id_required' }) // Updated with translation key
  country: any;
}

export class BulkCreateCityDto {
  @IsArray({ message: 'events.city.cities_array' }) // Updated with translation key
  @ValidateNested({ each: true })
  @Type(() => CreateCityDto)
  cities: CreateCityDto[];
}

export class UpdateCityDto extends PartialType(CreateCityDto) {}
