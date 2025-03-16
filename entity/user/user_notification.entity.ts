import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column({ default: false })
  is_read: boolean;

  @Column({ nullable: true })
  redirectable_id: number;

  @Column({ nullable: true })
  redirectable_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}