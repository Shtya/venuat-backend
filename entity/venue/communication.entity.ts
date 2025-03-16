import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: number;

  @Column()
  receiver_id: number;

  @Column()
  message: string;

  @Column()
  sender_type: string;

  @Column()
  receiver_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}