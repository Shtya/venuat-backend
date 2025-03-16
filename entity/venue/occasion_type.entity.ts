import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class OccasionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @OneToMany(() => Venue, venue => venue.occasion)
  venues: Venue[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


}