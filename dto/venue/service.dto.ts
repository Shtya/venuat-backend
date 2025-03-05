import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsBoolean, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';

export class CreateServiceDto {
  @IsObject({ message: "events.service_name_invalid" }) // اسم الخدمة غير صالح
  @IsNotEmpty({ message: "events.service_name_required" }) // اسم الخدمة مطلوب
  name: Record<string, any>;

  @IsOptional()
  @IsNumber({}, { message: "events.service_icon_invalid" }) // معرف الأيقونة غير صالح
  icon_media_id?: number;

  @IsOptional()
  @IsNumber({}, { message: "events.venue_package_service_invalid" }) // معرف خدمة الباقة غير صالح
  venuePackageServices_id?: number;

  @IsOptional()
  @IsBoolean({ message: "events.service_is_predefined_invalid" }) // قيمة غير صالحة لمعرف الخدمة
  is_predefined?: boolean;
}

export class ServiceDto {
  service: any; // ID of the service
  count: any;
  price: any;
}

export class AddServicesToVenueDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}

export class AddServiceToVenueDto {
  @IsNumber({}, { message: "events.service_id_invalid" }) // معرف الخدمة غير صالح
  service: number;

  @IsNumber({}, { message: "events.service_price_invalid" }) // السعر غير صالح
  price: number;

  @IsNumber({}, { message: 'events.addequipment.count' })
  @IsNotEmpty({ message: 'events.addequipment.count_required' })
  count: number;
}

export class CreateVenueServiceDto {
  @IsNumber({}, { message: "events.venue_id_invalid" }) // معرف القاعة غير صالح
  @IsNotEmpty({ message: "events.venue_id_required" }) // معرف القاعة مطلوب
  venue_id: number;

  @IsNumber({}, { message: "events.service_id_invalid" }) // معرف الخدمة غير صالح
  @IsNotEmpty({ message: "events.service_id_required" }) // معرف الخدمة مطلوب
  service_id: number;

  @IsNumber({}, { message: "events.service_price_invalid" }) // السعر غير صالح
  @IsNotEmpty({ message: "events.service_price_required" }) // السعر مطلوب
  price: number;
}

export class UpdateVenueServiceDto extends PartialType(CreateVenueServiceDto) {}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
