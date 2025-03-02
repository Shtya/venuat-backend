import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { Service } from './service.entity';

@Entity()
export class VenueService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, (venue) => venue.venueServices)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => Service, (service) => service.venueServices)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column('decimal')
  price: number;

  @Column('int')
  count: number; // Quantity of the equipment at the venue

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}