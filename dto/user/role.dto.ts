import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, ArrayNotEmpty, ArrayMinSize, IsPositive } from 'class-validator';
import { Role } from 'enums/Role.enum';

export class CreateRoleDto {
  @IsEnum(Role, { message: 'events.role_invalid1' }) // ✅ Enum validation
  @IsNotEmpty({ message: 'events.role_required1' })
  name: Role;

  @IsArray({ message: 'events.permissions_array_invalid' })
  @IsOptional()
  @IsNumber({}, { each: true, message: 'events.permission_must_be_number' }) 
  permissions?: number[];
}

export class AddPermissionsDto {
  @IsArray({ message: 'events.permission_ids_array_invalid' })
  @ArrayNotEmpty({ message: 'events.permission_ids_required' })
  @ArrayMinSize(1, { message: 'events.permission_ids_min_size' })
  @IsNumber({}, { each: true, message: 'events.permission_id_must_be_number' })
  @IsPositive({ each: true, message: 'events.permission_id_must_be_positive' })
  permissionIds: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
