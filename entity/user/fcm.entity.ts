import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FCM {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.fcms)
  user: User;

  @Column()
  device_token: string;

  @Column()
  platform: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}