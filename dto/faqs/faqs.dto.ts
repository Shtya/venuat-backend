import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateVenueFaqDto {
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  venue_id: number;

  @IsObject({ message: "events.questionMustBeObject" }) // يجب أن يكون السؤال كائن JSON
  @IsNotEmpty({ message: "events.questionRequired" }) // السؤال مطلوب
  question: Record<string, any>;

  @IsObject({ message: "events.answerMustBeObject" }) // يجب أن تكون الإجابة كائن JSON
  @IsNotEmpty({ message: "events.answerRequired" }) // الإجابة مطلوبة
  answer: Record<string, any>;
}

export class UpdateVenueFaqDto {
  @IsObject({ message: "events.questionMustBeObject" }) // يجب أن يكون السؤال كائن JSON
  @IsOptional()
  question?: Record<string, any>;

  @IsObject({ message: "events.answerMustBeObject" }) // يجب أن تكون الإجابة كائن JSON
  @IsOptional()
  answer?: Record<string, any>;
}
