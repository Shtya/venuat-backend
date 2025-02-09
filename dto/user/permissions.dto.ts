import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BulkCreatePermissionDto {
  @IsArray({ message: 'events.permissions_array_invalid' })
  @IsNotEmpty({ message: 'events.permissions_array_required' })
  permissions: CreatePermissionDto[];
}

export class CreatePermissionDto {
  @IsString({ message: 'events.permission_name_invalid' })
  @IsNotEmpty({ message: 'events.permission_name_required' })
  permission_name: string;
}
