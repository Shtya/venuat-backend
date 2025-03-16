import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { Feature } from './feature.entity';

@Entity()
export class VenueFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, venue => venue.venueFeatures)
  venue: Venue;

  @ManyToOne(() => Feature, feature => feature.venueFeatures)
  feature: Feature;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}