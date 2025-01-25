import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePackage } from './venue_package.entity';
import { Equipment } from './equipment.entity';

@Entity()
export class VenuePackageEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VenuePackage, venuePackage => venuePackage.venuePackageEquipments)
  package: VenuePackage;

  // @ManyToOne(() => Equipment, equipment => equipment.venuePackageEquipments_id)
  // equipment: Equipment;

  @Column()
  count: number;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}