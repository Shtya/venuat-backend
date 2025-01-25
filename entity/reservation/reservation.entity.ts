import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
// import { Venue } from '../venue/venue.entity';
// import { VenuePackage } from '../venue/venue_package.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  // @ManyToOne(() => Venue, venue => venue.reservations)
  // venue: Venue;

  // @ManyToOne(() => VenuePackage, venuePackage => venuePackage.reservations)
  // package: VenuePackage;

  @Column('jsonb')
  package_details: any;

  @Column()
  status: string;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;

  @Column('decimal')
  total_price: number;

  @Column('jsonb')
  special_requests: any;

  @Column()
  payment_method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}