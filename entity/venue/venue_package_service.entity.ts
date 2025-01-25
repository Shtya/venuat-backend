import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VenuePackage } from './venue_package.entity';
import { Service } from './service.entity';

@Entity()
export class VenuePackageService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VenuePackage, venuePackage => venuePackage.venuePackageServices)
  package: VenuePackage;

  @ManyToOne(() => Service, service => service.venuePackageServices_id)
  service: Service;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}