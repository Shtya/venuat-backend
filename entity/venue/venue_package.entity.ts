import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { VenuePackageService } from './venue_package_service.entity';
import { VenuePackageEquipment } from './venue_package_equipment.entity';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
export class VenuePackage {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Venue, venue => venue.venuePackages)
  // venue: Venue;

  @Column('jsonb')
  package_name: any;

  @Column('decimal')
  package_price: number;

  @OneToMany(() => VenuePackageService, venuePackageService => venuePackageService.package)
  venuePackageServices: VenuePackageService[];

  @OneToMany(() => VenuePackageEquipment, venuePackageEquipment => venuePackageEquipment.package)
  venuePackageEquipments: VenuePackageEquipment[];

  // @OneToMany(() => Reservation, reservation => reservation.package)
  // reservations: Reservation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}