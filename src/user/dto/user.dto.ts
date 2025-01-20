// src/modules/users/dto/user.dto.ts
import { IsString, IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';

// Translation paths for validation messages
const translations = {
  name: {
    string: 'events.validation.user.name.string', // "Name must be a string."
    minLength: 'events.validation.user.name.minLength', // "Name must be at least 3 characters long."
  },
  email: {
    email: 'events.validation.user.email.email', // "Invalid email format."
  },
  password: {
    string: 'events.validation.user.password.string', // "Password must be a string."
    minLength: 'events.validation.user.password.minLength', // "Password must be at least 3 characters long."
  },
  role: {
    enum: 'events.validation.user.role.enum', // "Role must be either 'admin' or 'user'."
  },
  avatar: {
    string: 'events.validation.user.avatar.string', // "Avatar must be a string."
  },
  status: {
    enum: 'events.validation.user.status.enum', // "Status must be either 'active' or 'inactive'."
  },
  phone: {
    string: 'events.validation.user.phone.string', // "Phone must be a string."
  },
  gender: {
    enum: 'events.validation.user.gender.enum', // "Gender must be either 'male', 'female', or 'none'."
  },
};

export class CreateUserDto {
  @IsString({ message: translations.name.string })
  @MinLength(3, { message: translations.name.minLength })
  name: string;

  @IsEmail({}, { message: translations.email.email })
  email: string;

  @IsString({ message: translations.password.string })
  @MinLength(3, { message: translations.password.minLength })
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: translations.role.enum })
  role?: string;

  @IsOptional()
  @IsString({ message: translations.avatar.string })
  avatar?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: translations.status.enum })
  status?: string;

  @IsOptional()
  @IsString({ message: translations.phone.string })
  phone?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: translations.gender.enum })
  gender?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: translations.name.string })
  @MinLength(3, { message: translations.name.minLength })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: translations.email.email })
  email?: string;

  @IsOptional()
  @IsString({ message: translations.password.string })
  @MinLength(3, { message: translations.password.minLength })
  password?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: translations.role.enum })
  role?: string;

  @IsOptional()
  @IsString({ message: translations.avatar.string })
  avatar?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: translations.status.enum })
  status?: string;

  @IsOptional()
  @IsString({ message: translations.phone.string })
  phone?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: translations.gender.enum })
  gender?: string;
}

export class FilterUserDto {
  @IsOptional()
  @IsString({ message: translations.name.string })
  name?: string;

  @IsOptional()
  @IsString({ message: translations.email.email })
  email?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: translations.role.enum })
  role?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: translations.status.enum })
  status?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: translations.gender.enum })
  gender?: string;
}