import { Type } from 'class-transformer';
import { 
  IsNotEmpty, 
  IsDate, 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsString, 
  isObject
} from 'class-validator';
import { ReservationStatus } from 'entity/reservation/reservation.entity';

export class CreateReservationDto {
  @IsNotEmpty({ message: "events.userIdRequired" }) // معرف المستخدم مطلوب
  @IsNumber({}, { message: "events.userIdMustBeNumber" }) // يجب أن يكون معرف المستخدم رقمًا
  user: number;

  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  venue: number;

  @IsOptional() // معرف الباقة مطلوب
  @IsNumber({}, { message: "events.packageIdMustBeNumber" }) // يجب أن يكون معرف الباقة رقمًا
  package: number | string;

  @IsOptional()
  package_details: object;

  @IsNotEmpty({ message: "events.reservationStatusRequired" }) // حالة الحجز مطلوبة
  @IsEnum(ReservationStatus, { message: "events.invalidReservationStatus" }) // حالة الحجز غير صالحة
  status: ReservationStatus;

  @IsNotEmpty({ message: "events.checkInDateRequired" }) // تاريخ تسجيل الدخول مطلوب
  @Type(() => Date)
  @IsDate({ message: "events.checkInMustBeDate" }) // يجب أن يكون تاريخ تسجيل الدخول تاريخًا صحيحًا
  check_in: Date;

  @IsNotEmpty({ message: "events.checkOutDateRequired" }) // تاريخ تسجيل الخروج مطلوب
  @Type(() => Date)
  @IsDate({ message: "events.checkOutMustBeDate" }) // يجب أن يكون تاريخ تسجيل الخروج تاريخًا صحيحًا
  check_out: Date;

  @IsNotEmpty({ message: "events.startTimeRequired" }) // وقت البدء مطلوب
  @IsString({ message: "events.startTimeMustBeString" }) // يجب أن يكون وقت البدء نصًا صالحًا بصيغة (HH:MM:SS)
  from_time: string;

  @IsNotEmpty({ message: "events.endTimeRequired" }) // وقت الانتهاء مطلوب
  @IsString({ message: "events.endTimeMustBeString" }) // يجب أن يكون وقت الانتهاء نصًا صالحًا بصيغة (HH:MM:SS)
  to_time: string;

  @IsNotEmpty({ message: "events.totalPriceRequired" }) // السعر الإجمالي مطلوب
  @IsNumber({}, { message: "events.totalPriceMustBeNumber" }) // يجب أن يكون السعر الإجمالي رقمًا
  total_price: number;

  @IsOptional()
  special_requests?: object;

  @IsOptional()
  @IsString({ message: "events.paymentMethodMustBeString" }) 
  payment_method: string;
}
