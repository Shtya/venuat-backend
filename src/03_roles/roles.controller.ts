// src/roles/roles.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AddPermissionsDto, CreateRoleDto, UpdateRoleDto } from 'dto/user/role.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_CREATE)
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createCustom(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_READ)
  async findAll() {
    return await this.rolesService.findAllCustom();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_READ)
  async findOne(@Param('id') id: number) {
    return await this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_UPDATE)
  async update(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return await this.rolesService.updateRole(id, dto);
  }

  @Patch(':id/permissions')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_UPDATE)
  async addPermissions(
    @Param('id') roleId: number, 
    @Body() dto : AddPermissionsDto
  ) {
    return await this.rolesService.addPermissions(roleId, dto.permissionIds);
  }

  @Delete(':id/permissions/:permissionId')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ROLES_DELETE)
  async removePermission(@Param('id') roleId: number, @Param('permissionId') permissionId: number) {
    return await this.rolesService.removePermission(roleId, permissionId);
  }
}
