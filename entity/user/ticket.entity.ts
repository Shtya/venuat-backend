import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.tickets)
  user: User;

  @ManyToOne(() => User, vendor => vendor.tickets)
  vendor: User;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  submission_date: Date;

  @Column({ nullable: true })
  resolution_date: Date;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}