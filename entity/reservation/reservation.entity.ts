import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Venue, (venue) => venue.reservations, { onDelete: 'CASCADE' })
  venue: Venue;

  @ManyToOne(() => VenuePackage, (e) => e.reservations, { onDelete: 'CASCADE' })
  package: VenuePackage;

  @Column('jsonb')
  package_details: object;

  @Column({ type: 'enum', enum: ReservationStatus })
  status: ReservationStatus;

  @Column({ type: 'date' })
  check_in: Date;

  @Column({ type: 'date' })
  check_out: Date;

  @Column({ type: 'time' })
  from_time: string;

  @Column({ type: 'time' })
  to_time: string;

  @Column('decimal')
  total_price: number;

  @Column('jsonb', { nullable: true })
  special_requests: object;

  @Column({ type: 'varchar', length: 255 })
  payment_method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
