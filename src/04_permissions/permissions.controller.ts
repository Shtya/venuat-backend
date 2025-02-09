// src/permissions/permissions.controller.ts
import { Controller, Post, Get, Param, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'entity/permission/permissions.entity';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';
import { BulkCreatePermissionDto, CreatePermissionDto } from 'dto/user/permissions.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('permissions')
export class PermissionsController {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly permissionsService: PermissionsService
  ) {}



  
  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PERMISSIONS_CREATE)
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    await checkFieldExists(this.permissionRepository, { permission_name: createPermissionDto.permission_name }, this.permissionsService.i18n.t("events.permission_name_unique")  );
    return this.permissionsService.create(createPermissionDto);
  }

  @Post('bulk-create')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PERMISSIONS_CREATE)
  async bulkCreate(@Body() dto: BulkCreatePermissionDto): Promise<Permission[]> {
    return this.permissionsService.bulkCreatePermissions(dto);
  }

  
  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PERMISSIONS_READ)
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, permission_name } = query;
    return this.permissionsService.findAll('permissions', page, limit, search, sortBy, sortOrder, ['permission_name']);
  }

  
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PERMISSIONS_DELETE)
  delete(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
