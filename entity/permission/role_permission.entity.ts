import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permissions.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission: Permission;

}
