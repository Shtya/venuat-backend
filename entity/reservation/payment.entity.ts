import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reservation, reservation => reservation.id)
  reservation: Reservation;

  @Column('decimal')
  amount: number;

  @Column()
  payment_method: string;

  @Column()
  transaction_id: string;

  @Column()
  status: string;

  @Column()
  payment_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}