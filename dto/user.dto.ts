import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

// Define enums for status, gender, and role
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inActive',
}

export enum UserRole {
  ADMIN = 'admin',
  VENUE = 'venue',
  USER = 'user',
}

export class CreateUserDto {
  @IsString({ message: 'Full name must be a string.' })
  @IsNotEmpty({ message: 'Full name is required.' })
  full_name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  phone: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsEnum(UserRole, { message: 'Role must be one of: admin, venue, user.' })
  @IsOptional()
  role: UserRole;

  @IsEnum(UserStatus, { message: 'Status must be either active or inActive.' })
  @IsOptional()
  status: UserStatus;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string.' })
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
