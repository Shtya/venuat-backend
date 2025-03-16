import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'vendor_id' })
  vendor: User;
  
  @ManyToOne(() => City, city => city.properties)
  @JoinColumn({ name: 'city_id' })
  city: City;
  
  @OneToMany(() => Venue, venue => venue.property)
  // @JoinColumn({ name: 'venue_id' })
  venue: Venue[];
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
