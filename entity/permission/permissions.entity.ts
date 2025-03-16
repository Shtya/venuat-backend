import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission_name: string;

  @ManyToMany(() => Role, (role) => role.permissions , {cascade : true})
  roles: Role[];
}
