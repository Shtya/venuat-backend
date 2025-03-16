import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'entity/permission/role.entity';
import { Permission } from 'entity/permission/permissions.entity';
import { BaseService } from 'common/base/base.service';
import { CreateRoleDto, UpdateRoleDto } from 'dto/user/role.dto';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(roleRepository);
  }

  async createCustom(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, permissions } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({ where: { name } });
    if (existingRole) throw new BadRequestException(this.i18n.t('events.role_already_exists', { args: { name: name } }));

    const role = this.roleRepository.create({ name });

    if (permissions && permissions.length > 0) role.permissions = await this.getValidPermissions(permissions);

    const savedRole = await this.roleRepository.save(role);
    return this.findOne(savedRole.id);
  }

  /** ✅ Find All Roles with Permissions */
  async findAllCustom(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  /** ✅ Find One Role */
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(this.i18n.t('events.role_not_found'));
    }
    return role;
  }

  /** ✅ Update Role */
  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    if (updateRoleDto.name) {
      const existingRole = await this.roleRepository.findOne({ where: { name: updateRoleDto.name } });
      if (existingRole && existingRole.id !== id) {
        throw new BadRequestException(this.i18n.t('events.role_name_unique'));
      }
      role.name = updateRoleDto.name;
    }

    if (updateRoleDto.permissions) {
      role.permissions = await this.getValidPermissions(updateRoleDto.permissions);
    }

    await this.roleRepository.save(role);
    return this.findOne(id);
  }

  /** ✅ Add Single Permission */
  async addPermissions(roleId: number, permissionIds: number[]): Promise<Role> {
    const role = await this.findOne(roleId);

    const permissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) }, // Use In to filter by multiple IDs
    });

    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException(this.i18n.t('events.permissions_not_found'));
    }

    role.permissions.push(...permissions); // Add all permissions to role
    await this.roleRepository.save(role);
    return this.findOne(roleId);
  }

  /** ✅ Remove Permission */
  async removePermission(roleId: number, permissionId: number): Promise<Role> {
    const role = await this.findOne(roleId);
    role.permissions = role.permissions.filter(perm => perm.id !== permissionId);
    await this.roleRepository.save(role);
    return this.findOne(roleId);
  }

  /** ✅ Get Valid Permissions */
  private async getValidPermissions(permissionIds: number[]): Promise<Permission[]> {
    const permissionEntities = await this.permissionRepository.find({
      where: { id: In(permissionIds) },
    });

    if (permissionEntities.length !== permissionIds.length) {
      throw new BadRequestException(this.i18n.t('events.invalid_permissions'));
    }

    return permissionEntities;
  }
}
