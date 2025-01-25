// src/countries/dto/create-country.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCountryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(255, { message: 'Name must be less than or equal to 255 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string; // Optional field example
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
