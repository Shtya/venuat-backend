
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model_id: number;

  @Column()
  model_type: string;

  @Column()
  collection_name: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  file_name: string;

  @Column()
  mime_type: string;

  @Column()
  disk: string;

  @Column()
  size: number;

  @Column({ type: 'json', default: '[]' })
  manipulations: Record<string, any>;

  @Column({ type: 'json', default: '[]' })
  custom_properties: Record<string, any>;

  @Column()
  order: number;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
