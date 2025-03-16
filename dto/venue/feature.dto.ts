import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateFeatureDto {
  @IsObject({ message: "events.feature_name_invalid" }) // التحقق من أن الاسم كائن JSON
  @IsNotEmpty({ message: "events.feature_name_required" }) // الاسم مطلوب
  feature_name: Record<string, any>; // JSONB لدعم التعدد اللغوي

  @IsNumber({}, { message: "events.icon_media_id_invalid" }) // يجب أن يكون رقمًا
  @IsOptional() // اختياري
  icon_media_id?: number;
}

export class AddFeatureToVenueDto {
  @IsNotEmpty({ message: "events.feature_id_required" }) // مطلوب
  @IsNumber({}, { message: "events.feature_id_invalid" }) // يجب أن يكون رقمًا
  feature_id: number;
}


export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
