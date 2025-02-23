import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePackage } from './venue_package.entity';
import { Service } from './service.entity';


@Entity('venue_package_service')
export class VenuePackageService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VenuePackage, (e) => e.services, { onDelete: 'CASCADE' })
  package: VenuePackage;

  @ManyToOne(()=> Service , e => e.venueServices)
  service: Service;

  @Column('decimal')
  price: number;
  
  @Column()
  count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
