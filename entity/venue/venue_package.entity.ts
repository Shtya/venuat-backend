import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenuePackageService } from './venue_package_service.entity';
import { VenuePackageEquipment } from './venue_package_equipment.entity';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Venue } from './venue.entity';


@Entity('venue_packages')
export class VenuePackage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> Venue , e => e.venuePackages )
  @JoinColumn({name : "venue_id"})
  venue: Venue;

  @Column()
  venue_id : number;
  

  @Column('jsonb') 
  package_name: object; // دعم تعدد اللغات

  @Column('decimal', { default : 0 ,  nullable: true })
  package_price: number;

  @Column('decimal', { default : 0 ,  nullable: true })
  offer_price_during_period : number;

  @Column({ type: 'timestamp', nullable: false })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @OneToMany(() => VenuePackageService, (vps) => vps.package)
  services: VenuePackageService[];

  @OneToMany(() => VenuePackageEquipment, (vpe) => vpe.package)
  equipments: VenuePackageEquipment[];

  @OneToMany(() => Reservation, (reservation) => reservation.package)
  reservations: Reservation[];

  @CreateDateColumn()
  created_at: Date;
  

  @UpdateDateColumn()
  updated_at: Date;
}
