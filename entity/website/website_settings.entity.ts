import { Media } from 'entity/media/media.entity';
import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity("website-settings")
export class WebsiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setting_key: string;

  @Column('jsonb')
  setting_value: any;

  @ManyToOne(() => Media, media => media.id)
  media: Media;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}