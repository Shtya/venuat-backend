import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity('venue_calendar')
export class VenueCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'venue_id' }) // Store only the venue_id
  venue_id: number;


  @ManyToOne(() => Venue, venue => venue.venueCalendars)
  @JoinColumn({name : "venue_id"})
  venue: Venue;

  @Column('jsonb')
  package_name: Record<string, any>;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('date')
  date_from: Date;

  @Column('date')
  date_to: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
