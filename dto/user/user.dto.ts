import { IsString, MinLength, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string.' })
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user.' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string.' })
  avatar?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive.' })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string.' })
  phone?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: 'Gender must be male, female, or none.' })
  gender?: string;
}


export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user.' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string.' })
  avatar?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive.' })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string.' })
  phone?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: 'Gender must be male, female, or none.' })
  gender?: string;
}



export class FilterUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a valid email address.' })
  email?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user.' })
  role?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive.' })
  status?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'none'], { message: 'Gender must be male, female, or none.' })
  gender?: string;
}
