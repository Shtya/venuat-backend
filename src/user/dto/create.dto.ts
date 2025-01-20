// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateDto {
  @IsString()
  @MinLength(3, { message: "events.validation.name.minLength" })
  name: string;

  @IsEmail()
  @MinLength(0, { message: "events.validation.email.required" })
  email: string;

  @IsString()
  @MinLength(3, { message: "events.validation.password.minLength" })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'user'], { message: "events.validation.role.invalid" })
  role?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], { message: "events.validation.status.invalid" })
  status?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

}