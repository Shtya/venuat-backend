import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { City } from '../property/city.entity';
import { Venue } from '../venue/venue.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;
  
  @Column('jsonb')
  description: any;

  @Column()
  file: string;
  
  @ManyToOne(() => User, user => user.properties)
  vendor: User;
  
  @ManyToOne(() => City, city => city.properties)
  city: City;
  
  // @OneToMany(() => Venue, venue => venue.property)
  // venue: Venue[];
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
