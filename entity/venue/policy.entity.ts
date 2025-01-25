import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePolicy } from '../venue/venue_policy.entity';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @Column('jsonb')
  description: any;

  @OneToMany(() => VenuePolicy, venuePolicy => venuePolicy.policy)
  venuePolicies: VenuePolicy[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}