import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsObject, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsObject()
  @IsNotEmpty()
  name: Record<string, any>; // JSONB field for multilingual names

  @IsOptional()
  icon_media_id?: number; // Optional media ID for the icon

  @IsOptional()
  venuePackageServices_id?: number; // Optional reference to venue package services

  @IsBoolean()
  @IsOptional()
  is_predefined?: boolean; // Optional flag for predefined services
}


export class AddServiceToVenueDto {
  @IsNumber()
  service_id: number;

  @IsNumber()
  price: number; // Price of the service at the venue
}


export class CreateVenueServiceDto {
	@IsNumber()
	@IsNotEmpty()
	venue_id: number;
  
	@IsNumber()
	@IsNotEmpty()
	service_id: number;
  
	@IsNumber()
	@IsNotEmpty()
	price: number;
  }


export class UpdateVenueServiceDto  extends PartialType(CreateVenueServiceDto) {}
export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
