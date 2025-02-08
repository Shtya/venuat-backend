import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueFeature } from '../venue/venue_feature.entity';
import { Media } from 'entity/media/media.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  feature_name: any;

  @Column({ nullable: true })
  icon_media_id: number;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn({ name: 'icon_media_id' })
  iconMedia: Media;

  @OneToMany(() => VenueFeature, venueFeature => venueFeature.feature)
  venueFeatures: VenueFeature[];

  @DeleteDateColumn() // Soft delete column
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}