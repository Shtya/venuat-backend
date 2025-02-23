import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { RoleSignup } from 'enums/Role.enum';

// Define enums for status, gender, and role
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inActive',
  PENDING = "pending"
}

export class CreateUserDto {
  @IsString({ message: 'events.full_name' })
  @IsNotEmpty({ message: 'events.full_name_required' })
  full_name: string;

  @IsEmail({}, { message: 'events.email_invalid' })
  @IsNotEmpty({ message: 'events.email_required' })
  email: string;

  @IsNotEmpty({ message: 'events.phone_required' })
  phone: string;

  @IsString({ message: 'events.password_invalid' })
  @IsNotEmpty({ message: 'events.password_required' })
  password: string;

  @IsEnum(RoleSignup, { message: 'events.role_invalid' }) // ✅ Enum validation
  @IsNotEmpty({ message: 'events.role_required' })
  role: any;

  @IsEnum(UserStatus, { message: 'events.status_invalid' })
  @IsOptional()
  status: UserStatus;

  @IsOptional()
  @IsString({ message: 'events.avatar_invalid' })
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
