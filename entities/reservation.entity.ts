import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('reservations')
@Unique(['date']) 
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  venueName: string; 

  @Column({ type: 'varchar', length: 255 })
  userName: string; 

  @Column({ type: 'numeric' })
  amount: number; 

  @Column({ type: 'date', unique: true })
  date: Date; 
}