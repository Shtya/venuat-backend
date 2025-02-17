import { IsString, IsOptional, IsUrl, IsArray, IsNumber, ValidateNested, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

class LocalizedText {
  @IsNotEmpty()
  @IsString()
  ar: string;

  @IsNotEmpty()
  @IsString()
  en: string;
}

class Faq {
  @IsString()
  id: string = uuidv4(); // إنشاء id تلقائي عند كل إضافة

  @ValidateNested()
  @Type(() => LocalizedText)
  question: LocalizedText;

  @ValidateNested()
  @Type(() => LocalizedText)
  answer: LocalizedText;
}

export class CreateHomeSettingsDto {
  @ValidateNested()
  @Type(() => LocalizedText)
  titleHome: LocalizedText;

  @ValidateNested()
  @Type(() => LocalizedText)
  secondTitleHome: LocalizedText;

  @IsOptional()
  @IsUrl()
  urlVideo?: string;

  @IsOptional()
  @IsArray()
  specialVenues?: number[];

  @IsOptional()
  @IsArray()
  bestRatedVenues?: number[];

  @ValidateNested()
  @Type(() => LocalizedText)
  termsAndCondition: LocalizedText;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Faq)
  faqs?: Faq[];
}



/** ✅ التحقق من النصوص بلغتين */
class LocalizedTextDto {
  @IsString()
  ar: string;

  @IsString()
  en: string;
}

/** ✅ DTO لإنشاء سؤال شائع */
export class CreateFaqDto {
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  question: LocalizedTextDto;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  answer: LocalizedTextDto;
}

/** ✅ DTO لتحديث سؤال شائع */
export class UpdateFaqDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  @IsOptional()
  question?: LocalizedTextDto;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  @IsOptional()
  answer?: LocalizedTextDto;
}

/** ✅ DTO لإنشاء منصة تواصل اجتماعي */
export class CreateSocialMediaDto {
  @IsString()
  name: string;

  @IsUrl()
  link: string;
}

/** ✅ DTO لتحديث منصة تواصل اجتماعي */
export class UpdateSocialMediaDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  link?: string;
}

/** ✅ DTO لتحديث إعدادات الصفحة الرئيسية */
export class UpdateHomeSettingsDto {
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  titleHome: LocalizedTextDto;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  secondTitleHome: LocalizedTextDto;

  @IsUrl()
  @IsOptional()
  urlVideo?: string;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  specialVenues?: number[];

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  bestRatedVenues?: number[];

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  termsAndCondition: LocalizedTextDto;
}
