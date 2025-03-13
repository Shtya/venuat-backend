import { IsDate, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';


export class CreateVenuePackageDto {
  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  venue_id: number;

  @IsNotEmpty({ message: "events.packageNameRequired" }) // اسم الباقة مطلوب
  @IsObject({ message: "events.packageNameMustBeObject" }) // يجب أن يكون اسم الباقة كائنًا (للدعم متعدد اللغات)
  package_name: object;

  package_price : number ;

  @IsNotEmpty({ message: "events.startDateRequired" })
  @IsDate({ message: "events.startDateMustBeDate" })
  @Type(() => Date)
  start_date: Date;

  @IsNotEmpty({ message: "events.endDateRequired" })
  @IsDate({ message: "events.endDateMustBeDate" })
  @Type(() => Date)
  end_date: Date;


  venue_price:number
  offer_price_during_period:number
}



export class UpdateVenuePackageDto extends PartialType(CreateVenuePackageDto) {}
