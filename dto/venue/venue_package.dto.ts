import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateVenuePackageDto {
  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  venue_id: number;

  @IsNotEmpty({ message: "events.packageNameRequired" }) // اسم الباقة مطلوب
  @IsObject({ message: "events.packageNameMustBeObject" }) // يجب أن يكون اسم الباقة كائنًا (للدعم متعدد اللغات)
  package_name: object;


  package_price : number ;
}


import { PartialType } from '@nestjs/mapped-types';
export class UpdateVenuePackageDto extends PartialType(CreateVenuePackageDto) {}
