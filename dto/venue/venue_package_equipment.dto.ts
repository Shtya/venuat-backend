import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVenuePackageEquipmentDto {
  @IsNotEmpty({ message: "events.packageIdRequired" }) // معرف الباقة مطلوب
  @IsNumber({}, { message: "events.packageIdMustBeNumber" }) // يجب أن يكون معرف الباقة رقمًا
  package: number;

  @IsNotEmpty({ message: "events.equipmentIdRequired" }) // معرف المعدة مطلوب
  @IsNumber({}, { message: "events.equipmentIdMustBeNumber" }) // يجب أن يكون معرف المعدة رقمًا
  equipment: number;

  @IsNotEmpty({ message: "events.countRequired" }) // العدد مطلوب
  @IsNumber({}, { message: "events.countMustBeNumber" }) // يجب أن يكون العدد رقمًا
  count: number;

  @IsNotEmpty({ message: "events.priceRequired" }) // السعر مطلوب
  @IsNumber({}, { message: "events.priceMustBeNumber" }) // يجب أن يكون السعر رقمًا
  price: number;
}
