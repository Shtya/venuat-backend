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
import { VenueRating } from './venue_ratings.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: true })
  type_place : string;

  @Column({ nullable: true })
  is_multi_place : boolean;


  @Column({ nullable: true })
  responsiblePersonName : string;

  @Column({ nullable: true })
  nearestMainAddress : string;
  @Column({ nullable: true })
  acceptTerms : boolean;




  @Column('jsonb', { nullable: true })
  name: any;

  @Column('jsonb', { nullable: true })
  description: any;






  @Column({ nullable: true })
  operating_system: string;

  @Column('double precision', { nullable: true })
  lat: number;

  @Column('double precision', { nullable: true })
  lng: number;

  @Column({ default: null, nullable: true })
  phone: string;

  @Column({ default: null, nullable: true })
  email: string;

  @Column({ default: null, nullable: true })
  contact_person: string;

  @Column({ default: null, nullable: true })
  opens_at: string;

  @Column({ default: null, nullable: true })
  closes_at: string;

  @Column({ default: null, nullable: true })
  area: number;


  @Column({ default: 0 , nullable: true })
  price: number;

  @Column({ default: null, nullable: true })
  max_capacity: number;

  @Column({ default: null, nullable: true })
  min_capacity: number;

  @Column({ default: false, nullable: true })
  is_fixed_setup: boolean;

  @Column({ default: false, nullable: true })
  u_shape: boolean;

  @Column({ default: false, nullable: true })
  theatre_style: boolean;

  @Column({ default: false, nullable: true })
  round_table: boolean;


  @Column({ default: false, nullable: true })
  classroom: boolean;

  @Column({ default: false, nullable: true })
  is_featured: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "int", default: 0 }) // Initialize with 0
  visitCount: number;

  
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  profile_image: string

  @Column({ type: "double precision", default: 0.15, nullable: true }) // Add VAT column with default value of 15%
  vat: number;

  @ManyToOne(() => OccasionType, occasionType => occasionType.venues)
  @JoinColumn({ name: "occasion_id" })
  occasion: OccasionType;

  @ManyToOne(() => Property, property => property.venue)
  @JoinColumn({ name: "property_id" }) 
  property: Property;

  
  @OneToMany(() => VenueService, venueService => venueService.venue)
  venueServices: VenueService[];

  @OneToMany(() => VenueEquipment, venueEquipment => venueEquipment.venue)
  venueEquipments: VenueEquipment[];
  

  @OneToMany(() => VenueFeature, venueFeature => venueFeature.venue)
  venueFeatures: VenueFeature[];


  @OneToMany(() => VenuePolicy, venuePolicy => venuePolicy.venue)
  venuePolicies: VenuePolicy[];

  @OneToMany(() => VenueRating, rating => rating.venue)
  ratings: VenueRating[];
  
  @OneToMany(() => VenueFAQ, venueFAQ => venueFAQ.venue)
  venueFAQs: VenueFAQ[];

  @OneToMany(() => VenueCalendar, venueCalendar => venueCalendar.venue)
  venueCalendars: VenueCalendar[];

  @OneToMany(() => VenuePackage, e => e.venue )
  venuePackages: VenuePackage[];

  @OneToMany(() => VenueGallery, venueGallery => venueGallery.venue)
  venueGalleries: VenueGallery[];


  @OneToMany(() => Reservation, reservation => reservation.venue)
  @JoinColumn({name : "id"})
  reservations: Reservation[];
}


