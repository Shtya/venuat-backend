import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(5, 15)
  phone?: string;

  @IsString()
  @Length(5, 1000)
  message: string;
}


import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactUsDto extends PartialType(CreateContactUsDto) {}
