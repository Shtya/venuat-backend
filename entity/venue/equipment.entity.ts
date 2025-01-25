import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueEquipment } from './venue_equipment.entity';
import { Media } from 'entity/media/media.entity';

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



  @Column({ default: false })
  is_predefined: boolean;

  @OneToMany(() => VenueEquipment, venueEquipment => venueEquipment.equipment)
  venueEquipments: VenueEquipment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}