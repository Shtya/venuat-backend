import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePolicy } from '../venue/venue_policy.entity';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @Column('jsonb')
  description: any;


  @Column({ default: true })
  is_predefined: boolean;


  @Column({ nullable: true }) // Nullable to allow global equipment
  user_id: number;



  @OneToMany(() => VenuePolicy, venuePolicy => venuePolicy.policy , {cascade : ["remove"] , onDelete : "CASCADE" } )
  venuePolicies: VenuePolicy[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}