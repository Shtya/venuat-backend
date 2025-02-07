import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BulkCreatePermissionDto {
  @IsArray({ message: 'Permissions must be an array' })
  @IsNotEmpty({ message: 'Permissions array cannot be empty' })
  permissions: CreatePermissionDto[];
}

export class CreatePermissionDto {
  @IsString({ message: 'Permission name must be a string' })
  @IsNotEmpty({ message: 'Permission name is required' })
  permission_name: string;
}
