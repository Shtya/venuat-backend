import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsString({ message: 'events.country.name_string' })  // Using translation key
  @IsNotEmpty({ message: 'events.country.name_required' })  // Using translation key
  name: string;

  @IsOptional()
  @IsString({ message: 'events.country.description_string' })  // Using translation key
  description?: string; // Optional field example
}

export class BulkCreateCountryDto {
  countries: CreateCountryDto[];
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
