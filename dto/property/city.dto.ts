// src/city/dto/create-city.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCityDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsNotEmpty({ message: 'Country ID is required.' })
  country: any;
}

export class UpdateCityDto extends PartialType(CreateCityDto) {}