import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.otps)
  user: User;

  @Column()
  otp_code: string;

  @Column()
  otp_expiry: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}