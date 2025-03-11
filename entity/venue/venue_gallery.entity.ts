

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity('venue_gallery')
export class VenueGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  venue_id: number;

  @ManyToOne(() => Venue, (venue) => venue.venueGalleries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column('text', { array: true }) // Store multiple image URLs as an array
  imgs: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
