import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueEquipment } from './venue_equipment.entity';
import { Media } from 'entity/media/media.entity';
import { VenuePackageEquipment } from './venue_package_equipment.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @Column({ nullable: true })
  icon_media_id: number;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn({ name: 'icon_media_id' })
  iconMedia: Media;


  @OneToMany(() => VenuePackageEquipment, (e) => e.equipment)
  equipments: VenuePackageEquipment[];

  @Column({ default: false })
  is_predefined: boolean;

  @OneToMany(() => VenueEquipment, venueEquipment => venueEquipment.equipment)
  venueEquipments: VenueEquipment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}