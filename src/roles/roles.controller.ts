// src/roles/roles.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AddPermissionsDto, CreateRoleDto, UpdateRoleDto } from 'dto/user/role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createCustom(dto);
  }

  @Get()
  async findAll() {
    return await this.rolesService.findAllCustom();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.rolesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return await this.rolesService.updateRole(id, dto);
  }

  @Patch(':id/permissions')
  async addPermissions(
    @Param('id') roleId: number, 
    @Body() dto : AddPermissionsDto
  ) {
    return await this.rolesService.addPermissions(roleId, dto.permissionIds);
  }

  @Delete(':id/permissions/:permissionId')
  async removePermission(@Param('id') roleId: number, @Param('permissionId') permissionId: number) {
    return await this.rolesService.removePermission(roleId, permissionId);
  }
}
