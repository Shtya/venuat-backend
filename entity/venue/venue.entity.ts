import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { OccasionType } from './occasion_type.entity';
import { VenueFeature } from './venue_feature.entity';
import { VenueService } from './venue_service.entity';
import { Property } from '../property/property.entity';
import { VenueEquipment } from './venue_equipment.entity';
import { VenuePolicy } from './venue_policy.entity';
import { VenuePackage } from './venue_package.entity';
import { VenueGallery } from './venue_gallery.entity';
import { VenueFAQ } from './venue_faq.entity';
import { Reservation } from '../reservation/reservation.entity';
import { VenueCalendar } from './venue_calendar.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: any;

  @Column('jsonb')
  description: any;

  @Column()
  operating_system: string;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  lng: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  contact_person: string;

  @Column()
  opens_at: string;

  @Column()
  closes_at: string;

  @Column()
  area: number;

  @Column()
  max_capacity: number;

  @Column()
  min_capacity: number;

  @Column()
  is_fixed_setup: boolean;

  @Column()
  u_shape: boolean;

  @Column()
  theatre_style: boolean;

  @Column()
  round_table: boolean;

  @Column()
  classroom: boolean;

  @Column({ default: false })
  is_featured: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  profile_image_id: number;

  @ManyToOne(() => OccasionType, occasionType => occasionType.venues)
  occasion_type: OccasionType;

  @OneToMany(() => VenueFeature, venueFeature => venueFeature.venue)
  venueFeatures: VenueFeature[];

  @OneToMany(() => VenueService, venueService => venueService.venue)
  venueServices: VenueService[];

  
  @OneToMany(() => VenueEquipment, venueEquipment => venueEquipment.venue)
  venueEquipments: VenueEquipment[];

  @OneToMany(() => VenuePolicy, venuePolicy => venuePolicy.venue)
  venuePolicies: VenuePolicy[];
  
  @OneToMany(() => VenueFAQ, venueFAQ => venueFAQ.venue)
  venueFAQs: VenueFAQ[];

  @OneToMany(() => VenueCalendar, venueCalendar => venueCalendar.venue)
  venueCalendars: VenueCalendar[];

  @ManyToOne(() => Property, property => property.venue)
  @JoinColumn({ name: 'property_id' })
  property: Property;


  // @OneToMany(() => VenuePackage, venuePackage => venuePackage.venue)
  // venuePackages: VenuePackage[];

  // @OneToMany(() => VenueGallery, venueGallery => venueGallery.venue)
  // venueGalleries: VenueGallery[];


  // @OneToMany(() => Reservation, reservation => reservation.venue)
  // reservations: Reservation[];
}