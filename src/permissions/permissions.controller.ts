// src/permissions/permissions.controller.ts
import { Controller, Post, Get, Param, Body, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'entity/permission/permissions.entity';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';
import { BulkCreatePermissionDto, CreatePermissionDto } from 'dto/user/permissions.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly permissionsService: PermissionsService
  ) {}



  
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    await checkFieldExists(this.permissionRepository, { permission_name: createPermissionDto.permission_name }, 'the permission name should be unique.');
    return this.permissionsService.create(createPermissionDto);
  }



  
  @Post('bulk-create')
  async bulkCreate(@Body() dto: BulkCreatePermissionDto): Promise<Permission[]> {
    return this.permissionsService.bulkCreatePermissions(dto);
  }



  
  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, permission_name } = query;
    return this.permissionsService.findAll('permissions', page, limit, search, sortBy, sortOrder, ['permission_name']);
  }



  
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
