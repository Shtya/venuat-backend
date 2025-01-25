// // src/venue/dto/create-venue.dto.ts
// import { IsNotEmpty, IsNumber } from 'class-validator';

// export class CreateVenueDto {
//   @IsNumber({}, { message: 'Property ID must be a number.' })
//   @IsNotEmpty({ message: 'Property ID is required.' })
//   propertyId: number;

//   // Add other fields for Venue as needed
// }

import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVenueDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsObject({ message: 'Name should be a JSON object' })
  name: any;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsObject({ message: 'Description should be a JSON object' })
  description: any;

  @IsNotEmpty({ message: 'Operating system should not be empty' })
  @IsString({ message: 'Operating system should be a string' })
  operating_system: string;

  @IsNotEmpty({ message: 'Latitude should not be empty' })
  @IsNumber({}, { message: 'Latitude should be a number' })
  lat: number;

  @IsNotEmpty({ message: 'Longitude should not be empty' })
  @IsNumber({}, { message: 'Longitude should be a number' })
  lng: number;

  @IsNotEmpty({ message: 'Phone should not be empty' })
  @IsString({ message: 'Phone should be a string' })
  phone: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  email: string;

  @IsNotEmpty({ message: 'Contact person should not be empty' })
  @IsString({ message: 'Contact person should be a string' })
  contact_person: string;

  @IsNotEmpty({ message: 'Opens at should not be empty' })
  @IsString({ message: 'Opens at should be a string' })
  opens_at: string;

  @IsNotEmpty({ message: 'Closes at should not be empty' })
  @IsString({ message: 'Closes at should be a string' })
  closes_at: string;

  @IsNotEmpty({ message: 'Area should not be empty' })
  @IsNumber({}, { message: 'Area should be a number' })
  area: number;

  @IsNotEmpty({ message: 'Max capacity should not be empty' })
  @IsNumber({}, { message: 'Max capacity should be a number' })
  max_capacity: number;

  @IsNotEmpty({ message: 'Min capacity should not be empty' })
  @IsNumber({}, { message: 'Min capacity should be a number' })
  min_capacity: number;

  @IsNotEmpty({ message: 'Is fixed setup should not be empty' })
  @IsBoolean({ message: 'Is fixed setup should be a boolean' })
  is_fixed_setup: boolean;

  @IsNotEmpty({ message: 'U-shape should not be empty' })
  @IsBoolean({ message: 'U-shape should be a boolean' })
  u_shape: boolean;

  @IsNotEmpty({ message: 'Theatre style should not be empty' })
  @IsBoolean({ message: 'Theatre style should be a boolean' })
  theatre_style: boolean;

  @IsNotEmpty({ message: 'Round table should not be empty' })
  @IsBoolean({ message: 'Round table should be a boolean' })
  round_table: boolean;

  @IsNotEmpty({ message: 'Classroom should not be empty' })
  @IsBoolean({ message: 'Classroom should be a boolean' })
  classroom: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Is featured should be a boolean' })
  is_featured: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Occasion type ID should be a number' })
  occasion_type_id: number;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
