import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { Policy } from './policy.entity';

@Entity()
export class VenuePolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, venue => venue.venuePolicies)
  venue: Venue;

  @ManyToOne(() => Policy, policy => policy.venuePolicies)
  policy: Policy;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}