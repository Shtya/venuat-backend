import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueService } from './venue_service.entity';
import { Media } from 'entity/media/media.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @Column({ nullable: true })
  icon_media_id: number;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn({ name: 'icon_media_id' })
  iconMedia: Media;

  @Column({ nullable: true })
  venuePackageServices_id: number;

  @Column({ default: false })
  is_predefined: boolean;

  @OneToMany(() => VenueService, venueService => venueService.service)
  venueServices: VenueService[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}