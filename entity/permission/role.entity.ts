import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Permission } from './permissions.entity';
import { User } from 'entity/user/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles )
  @JoinTable({})
  permissions: Permission[];
}
