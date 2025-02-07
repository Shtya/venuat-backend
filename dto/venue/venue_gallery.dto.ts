import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, ArrayMinSize } from 'class-validator';

export class CreateVenueGalleryDto {
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  @IsPositive({ message: "events.venueIdMustBePositive" }) // يجب أن يكون معرف القاعة رقمًا موجبًا
  venue_id: number; // Venue ID (must be a positive number)

  @IsArray({ message: "events.imgsMustBeArray" }) // يجب أن يكون الصور مصفوفة
  @ArrayMinSize(1, { message: "events.imgsMinOneRequired" }) // يجب تحميل صورة واحدة على الأقل
  @IsString({ each: true, message: "events.imgsMustBeString" }) // يجب أن يكون كل عنصر في المصفوفة نصًا (رابط URL)
  imgs: string[];
}

// تحديث البيانات جزئيًا باستخدام PartialType
export class UpdateVenueGalleryDto extends PartialType(CreateVenueGalleryDto) {}
