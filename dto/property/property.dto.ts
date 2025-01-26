// src/property/dto/create-property.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';



export class CreatePropertyDto {
  @IsObject({ message: 'Name must be a valid object.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: {en:string , ar : string};

  @IsObject({ message: 'Description must be a valid object.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: {en:string , ar:string};

  // @IsString({ message: 'File must be a string.' })
  // @IsNotEmpty({ message: 'File is required.' })
  file: string;

  @IsNumber({}, { message: 'Vendor ID must be a number.' })
  @IsNotEmpty({ message: 'Vendor ID is required.' })
  vendor_id: any;

  @IsNumber({}, { message: 'City ID must be a number.' })
  @IsNotEmpty({ message: 'City ID is required.' })
  city_id: any;


  // @IsNumber({}, { message: 'Venue ID must be a number.' })
  // @IsNotEmpty({ message: 'Venue ID is required.' })
  // venue_id : any;
}



export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}