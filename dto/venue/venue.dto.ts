import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateVenueDto {

  type_place ?: string;


  @IsOptional()
  @IsObject({ message: 'events.venue_name_invalid' })
  name?: any;

  @IsOptional()
  @IsObject({ message: 'events.venue_description_invalid' })
  description?: any;

  @IsOptional()
  @IsString({ message: 'events.venue_operating_system_invalid' })
  operating_system?: string;

  @IsOptional()
  @IsNumber({}, { message: 'events.venue_lat_invalid' })
  lat?: number;

  @IsOptional()
  @IsNumber({}, { message: 'events.venue_lng_invalid' })
  lng?: number;

  @IsOptional()
  @IsString({ message: 'events.venue_phone_invalid' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'events.venue_email_invalid' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'events.venue_contact_person_invalid' })
  contact_person?: string;

  @IsOptional()
  @IsString({ message: 'events.venue_opens_at_invalid' })
  opens_at?: string;

  @IsOptional()
  @IsString({ message: 'events.venue_closes_at_invalid' })
  closes_at?: string;

  @IsOptional()
  @IsNumber({}, { message: 'events.venue_area_invalid' })
  area?: number;

  @IsOptional()
  @IsNumber({}, { message: 'events.price_must_be_Number' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'events.venue_max_capacity_invalid' })
  max_capacity?: number;

  @IsOptional()
  @IsNumber({}, { message: 'events.venue_min_capacity_invalid' })
  min_capacity?: number;

  @IsOptional()
  @IsBoolean({ message: 'events.venue_is_fixed_setup_invalid' })
  is_fixed_setup?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'events.venue_u_shape_invalid' })
  u_shape?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'events.venue_theatre_style_invalid' })
  theatre_style?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'events.venue_round_table_invalid' })
  round_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'events.venue_classroom_invalid' })
  classroom?: boolean;

  @IsNotEmpty({ message: 'events.venue_property_id_invalid' })
  @IsNumber({}, { message: 'events.venue_property_id_invalid' })
  property: number;

  @IsOptional()
  @IsNumber({}, { message: 'events.occasion_type_id_invalid' })
  occasion: number;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
