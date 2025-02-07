import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePackage } from './venue_package.entity';
import { Equipment } from './equipment.entity';

@Entity('venue_package_equipment')
export class VenuePackageEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VenuePackage, (e) => e.equipments, { onDelete: 'CASCADE' })
  package: VenuePackage;

  @ManyToOne(()=> Equipment , (e) => e.equipments , { onDelete: 'CASCADE' })
  equipment: Equipment;

  @Column()
  count: number;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
