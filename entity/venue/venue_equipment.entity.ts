// src/venue-equipment/venue-equipment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { Equipment } from './equipment.entity';


@Entity()
export class VenueEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, (venue) => venue.venueEquipments)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @ManyToOne(() => Equipment, (equipment) => equipment.venueEquipments)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @Column('int')
  count: number; // Quantity of the equipment at the venue

  @Column('decimal')
  price: number; // Price of the equipment

  @Column('varchar')
  price_per: string; // Price per unit (e.g., "hour", "day")

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}