// src/permissions/permissions.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'entity/permission/permissions.entity';
import { BaseService } from 'common/base/base.service';
import { BulkCreatePermissionDto } from 'dto/user/permissions.dto';

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(permissionRepository);
  }


  async bulkCreatePermissions(dto: BulkCreatePermissionDto): Promise<Permission[]> {
    const { permissions } = dto;

    // Check for duplicate permissions
    const existingPermissions = await this.permissionRepository.find({
      where: permissions.map((perm) => ({ permission_name: perm.permission_name })),
    });

    if (existingPermissions.length > 0) {
      throw new BadRequestException(this.i18n.t("events.permissions_already_exist")
    );
    }

    // Create new permissions
    const newPermissions = this.permissionRepository.create(permissions);
    return this.permissionRepository.save(newPermissions);
  }
}
