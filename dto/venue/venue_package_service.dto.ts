import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateVenuePackageServiceDto {
  @IsNotEmpty({ message: "events.packageIdRequired" }) // معرف الباقة مطلوب
  @IsNumber({}, { message: "events.packageIdMustBeNumber" }) // يجب أن يكون معرف الباقة رقمًا
  package: number;

  @IsNotEmpty({ message: "events.serviceIdRequired" }) // معرف الخدمة مطلوب
  @IsNumber({}, { message: "events.serviceIdMustBeNumber" }) // يجب أن يكون معرف الخدمة رقمًا
  service: number;

  @IsNotEmpty({ message: "events.countRequired" }) // العدد مطلوب
  @IsNumber({}, { message: "events.countMustBeNumber" }) // يجب أن يكون العدد رقمًا
  count: number;

  @IsNotEmpty({ message: "events.priceRequired" }) // السعر مطلوب
  @IsNumber({}, { message: "events.priceMustBeNumber" }) // يجب أن يكون السعر رقمًا
  price: number;
}

// تحديث البيانات جزئيًا باستخدام PartialType
import { PartialType } from '@nestjs/mapped-types';
export class UpdateVenuePackageServiceDto extends PartialType(CreateVenuePackageServiceDto) {}
