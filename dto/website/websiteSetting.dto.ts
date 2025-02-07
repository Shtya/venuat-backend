import { IsNotEmpty, IsObject, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class CreateWebsiteSettingsDto {
  @ApiProperty({
    description: 'The pages settings in multiple languages',
  })
  @IsNotEmpty({ message: 'events.pages_setting_empty' })
  @IsArray({ message: 'events.pages_setting_invalid_array' })
  @ValidateNested({ each: true, message: 'events.pages_setting_invalid_object' })
  @Type(() => Object)
  pages: {
    id?: string;
    ar: string;
    en: string;
  }[] = [];

  @ApiProperty({
    description: 'Terms and conditions content in multiple languages',
  })
  @IsNotEmpty({ message: 'events.terms_conditions_empty' })
  @IsObject({ message: 'events.terms_conditions_invalid_object' })
  termsAndCondition: Record<string, string>;

  @ApiProperty({
    description: 'FAQ questions and answers in multiple languages',
  })
  @IsNotEmpty({ message: 'events.faq_empty' })
  @IsArray({ message: 'events.faq_invalid_array' })
  @ValidateNested({ each: true, message: 'events.faq_invalid_object' })
  @Type(() => Object)
  faqs: {
    id?: string;
    question: Record<string, string>;
    answer: Record<string, string>;
  }[] = [];

  constructor() {
    this.pages = this.pages.map(page => ({
      ...page,
      id: page.id || uuidv4(),
    }));

    this.faqs = this.faqs.map(faq => ({
      ...faq,
      id: faq.id || uuidv4(),
    }));
  }
}

import { PartialType } from '@nestjs/mapped-types';

export class UpdateWebsiteSettingsDto extends PartialType(CreateWebsiteSettingsDto) {}
