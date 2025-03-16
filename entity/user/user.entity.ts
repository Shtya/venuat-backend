import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserNotification } from './user_notification.entity';
import { Property } from '../property/property.entity';
import { Reservation } from '../reservation/reservation.entity';
import { Ticket } from './ticket.entity';
import { OTP } from './otp.entity';
import { FCM } from './fcm.entity';
import { Role } from 'entity/permission/role.entity';
import { VenueRating } from 'entity/venue/venue_ratings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  otpToken: string;

  @Column({ default: null })
  otpExpire: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Property, property => property.vendor)
  properties: Property[];

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => VenueRating, rating => rating.venue)
  ratings: VenueRating[];

  @OneToMany(() => OTP, otp => otp.user)
  otps: OTP[];

  @OneToMany(() => FCM, fcm => fcm.user)
  fcms: FCM[];

  @ManyToOne(() => Role, role => role.id)
  role: Role;

  @OneToMany(() => UserNotification, notification => notification.user)
  notifications: UserNotification[];
}
