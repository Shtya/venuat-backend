import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class VenueGallery {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Venue, venue => venue.venueGalleries)
  // venue: Venue;

  @Column()
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

