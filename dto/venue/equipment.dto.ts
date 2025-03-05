import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class AddEquipmentToVenueDto {
  @IsNumber({}, { message: 'events.addequipment.equipment_id' })
  @IsNotEmpty({ message: 'events.addequipment.equipment_id_required' })
  equipment_id: number;

  @IsNumber({}, { message: 'events.addequipment.count' })
  @IsNotEmpty({ message: 'events.addequipment.count_required' })
  count: number;

  @IsNumber({}, { message: 'events.addequipment.price' })
  @IsNotEmpty({ message: 'events.addequipment.price_required' })
  price: number;

  @IsString({ message: 'events.addequipment.price_per' })
  @IsNotEmpty({ message: 'events.addequipment.price_per_required' })
  price_per: string;
}



import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EquipmentDto {
  equipment_id: number; // ID of the equipment
  count: number;
  price: number;
  price_per: string;
}

export class AddEquipmentsToVenueDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipmentDto)
  equipments: EquipmentDto[];
}




import { PartialType } from '@nestjs/mapped-types';
import { IsObject, IsOptional, IsBoolean } from 'class-validator';

export class CreateEquipmentDto {
  @IsObject({ message: 'events.createequipment.name' })
  name: any;

  @IsOptional()
  @IsNumber({}, { message: 'events.createequipment.icon_media_id' })
  icon_media_id?: number;

  @IsBoolean({ message: 'events.createequipment.is_predefined' })
  @IsOptional()
  is_predefined?: boolean;
}




export class UpdateVenueEquipmentDto extends PartialType(AddEquipmentToVenueDto) {}
export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}
