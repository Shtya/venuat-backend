// src/equipment/dto/create-equipment.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsObject, IsOptional, IsBoolean } from 'class-validator';

export class CreateEquipmentDto {
  @IsObject()
  name: any; // Multilingual name

  @IsOptional()
  icon_media_id?: number; // Optional icon media ID

  @IsBoolean()
  @IsOptional()
  is_predefined?: boolean; // Optional predefined flag
}


// src/venue-equipment/dto/add-equipment-to-venue.dto.ts
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class AddEquipmentToVenueDto {
  @IsNumber()
  @IsNotEmpty()
  equipment_id: number; // ID of the equipment

  @IsNumber()
  @IsNotEmpty()
  count: number; // Quantity of the equipment

  @IsNumber()
  @IsNotEmpty()
  price: number; // Price of the equipment

  @IsString()
  @IsNotEmpty()
  price_per: string; // Price per unit (e.g., "hour", "day")
}

export class UpdateVenueEquipmentDto  extends PartialType(AddEquipmentToVenueDto) {}
export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}
