import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class VenueFAQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, venue => venue.venueFAQs)
  @JoinColumn({name : "venue_id"})
  venue: Venue;

  @Column('jsonb')
  question: any;

  @Column('jsonb')
  answer: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}