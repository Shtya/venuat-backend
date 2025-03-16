import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { User } from 'entity/user/user.entity';

@Entity()
export class VenueFAQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, (venue) => venue.venueFAQs)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ default: null })  // ✅ حقل جديد لتحديد حالة السؤال
  user_id: number;

  @Column('jsonb')
  question: any;

  @Column('jsonb', { nullable: true })
  answer: any;

  @Column({ type: 'enum', enum: ['pending', 'answered'], default: 'answered' })  // ✅ حقل جديد لتحديد حالة السؤال
  status: 'pending' | 'answered';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
