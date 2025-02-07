// src/roles/dto/create-role.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, ArrayNotEmpty, ArrayMinSize, IsPositive } from 'class-validator';
import { Role } from 'enums/Role.enum';

export class CreateRoleDto {
  @IsEnum(Role, { message: `Role must be one of the following: ${Object.values(Role).join(', ')}` }) // ✅ Enum validation
  @IsNotEmpty({ message: 'Role is required' })
  name: Role;

  @IsArray({ message: 'Permissions must be an array' })
  @IsOptional()
  @IsNumber({}, { each: true, message: 'Each permission must be a number' }) 
  permissions?: number[];
}


export class AddPermissionsDto {
  @IsArray({ message: 'permissionIds must be an array of numbers.' })
  @ArrayNotEmpty({ message: 'permissionIds cannot be empty.' })
  @ArrayMinSize(1, { message: 'At least one permissionId is required.' })
  @IsNumber({} , { each: true, message: 'Each permissionId must be a number.' })
  @IsPositive({ each: true, message: 'Each permissionId must be a positive integer.' })
  permissionIds: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
