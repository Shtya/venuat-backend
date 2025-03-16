import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { User } from 'entity/user/user.entity';


@Entity('venue_ratings')
export class VenueRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, venue => venue.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({name : "venue_id"})
  venue: Venue;

  @ManyToOne(() => User, user => user.ratings, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', precision: 2, scale: 1 }) // الآن يقبل أرقامًا عشرية مثل 4.5
  rating: number;

  @Column({ type: 'text', nullable: true })
  review: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
