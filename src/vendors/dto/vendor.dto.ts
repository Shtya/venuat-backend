// src/modules/vendors/dto/vendor.dto.ts
import { IsOptional, IsString, IsNumber, IsDateString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MultilingualString {
  @IsString({ message: 'events.validation.vendor.multilingual.en.string' }) // English: "English field must be a string."
  en: string;

  @IsString({ message: 'events.validation.vendor.multilingual.ar.string' }) // Arabic: "الحقل العربي يجب أن يكون نصًا."
  ar: string;
}

export class CreateVendorDto {
  @IsObject({ message: 'events.validation.vendor.property_name.object' }) // English: "Property name must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  property_name: MultilingualString;

  @IsObject({ message: 'events.validation.vendor.occasion_type.object' }) // English: "Occasion type must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  occasion_type: MultilingualString;

  @IsString({ message: 'events.validation.vendor.operating_system.string' }) // English: "Operating system must be a string."
  operating_system: string;

  @IsDateString({}, { message: 'events.validation.vendor.joined_date.date' }) // English: "Joined date must be a valid date string."
  joined_date: Date;

  @IsNumber({}, { message: 'events.validation.vendor.overall_revenue.number' }) // English: "Overall revenue must be a number."
  overall_revenue: number;

  @IsObject({ message: 'events.validation.vendor.location.object' }) // English: "Location must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  location: MultilingualString;

  @IsObject({ message: 'events.validation.vendor.address.object' }) // English: "Address must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  address: MultilingualString;

  @IsString({ message: 'events.validation.vendor.mobile.string' }) // English: "Mobile number must be a string."
  mobile: string;

  @IsString({ message: 'events.validation.vendor.email.string' }) // English: "Email must be a string."
  email: string;

  @IsObject({ message: 'events.validation.vendor.contact_person.object' }) // English: "Contact person must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  contact_person: MultilingualString;
}

export class UpdateVendorDto {
  @IsOptional()
  @IsObject({ message: 'events.validation.vendor.property_name.object' }) // English: "Property name must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  property_name?: MultilingualString;

  @IsOptional()
  @IsObject({ message: 'events.validation.vendor.occasion_type.object' }) // English: "Occasion type must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  occasion_type?: MultilingualString;

  @IsOptional()
  @IsString({ message: 'events.validation.vendor.operating_system.string' }) // English: "Operating system must be a string."
  operating_system?: string;

  @IsOptional()
  @IsDateString({}, { message: 'events.validation.vendor.joined_date.date' }) // English: "Joined date must be a valid date string."
  joined_date?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'events.validation.vendor.overall_revenue.number' }) // English: "Overall revenue must be a number."
  overall_revenue?: number;

  @IsOptional()
  @IsObject({ message: 'events.validation.vendor.location.object' }) // English: "Location must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  location?: MultilingualString;

  @IsOptional()
  @IsObject({ message: 'events.validation.vendor.address.object' }) // English: "Address must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  address?: MultilingualString;

  @IsOptional()
  @IsString({ message: 'events.validation.vendor.mobile.string' }) // English: "Mobile number must be a string."
  mobile?: string;

  @IsOptional()
  @IsString({ message: 'events.validation.vendor.email.string' }) // English: "Email must be a string."
  email?: string;

  @IsOptional()
  @IsObject({ message: 'events.validation.vendor.contact_person.object' }) // English: "Contact person must be an object."
  @ValidateNested()
  @Type(() => MultilingualString)
  contact_person?: MultilingualString;
}

export class FilterVendorDto {
  @IsOptional()
  @IsString({ message: 'events.validation.vendor.location.string' }) // English: "Location must be a string."
  location?: string;

  @IsOptional()
  @IsString({ message: 'events.validation.vendor.occasion_type.string' }) // English: "Occasion type must be a string."
  occasion_type?: string;
}