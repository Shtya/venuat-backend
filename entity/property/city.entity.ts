import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Country } from './country.entity';
import { Property } from './property.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, country => country.cities)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => Property, property => property.city)
  properties: Property[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // In your City entity
  @DeleteDateColumn()
  deletedAt: Date;
}