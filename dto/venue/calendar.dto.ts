import { IsNotEmpty, IsObject, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateVenueCalendarDto {
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  venue_id: number;

  @IsObject({ message: "events.packageNameMustBeObject" }) // يجب أن يكون اسم الباقة كائن JSON
  @IsNotEmpty({ message: "events.packageNameRequired" }) // اسم الباقة مطلوب
  package_name: Record<string, any>;

  @IsNumber({}, { message: "events.priceMustBeNumber" }) // يجب أن يكون السعر رقمًا
  @IsNotEmpty({ message: "events.priceRequired" }) // السعر مطلوب
  price: number;

  @IsDateString({}, { message: "events.dateFromMustBeValid" }) // يجب أن يكون تاريخ البداية صالحًا
  @IsNotEmpty({ message: "events.dateFromRequired" }) // تاريخ البداية مطلوب
  date_from: Date;

  @IsDateString({}, { message: "events.dateToMustBeValid" }) // يجب أن يكون تاريخ النهاية صالحًا
  @IsNotEmpty({ message: "events.dateToRequired" }) // تاريخ النهاية مطلوب
  date_to: Date;
}

export class UpdateVenueCalendarDto {
  @IsObject({ message: "events.packageNameMustBeObject" }) // يجب أن يكون اسم الباقة كائن JSON
  @IsOptional()
  package_name?: Record<string, any>;

  @IsNumber({}, { message: "events.priceMustBeNumber" }) // يجب أن يكون السعر رقمًا
  @IsOptional()
  price?: number;

  @IsDateString({}, { message: "events.dateFromMustBeValid" }) // يجب أن يكون تاريخ البداية صالحًا
  @IsOptional()
  date_from?: Date;

  @IsDateString({}, { message: "events.dateToMustBeValid" }) // يجب أن يكون تاريخ النهاية صالحًا
  @IsOptional()
  date_to?: Date;
}
