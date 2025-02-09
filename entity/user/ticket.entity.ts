import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User, { nullable: true })  
  vendor: User;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({ type: 'timestamp', nullable: true })
  submissionDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolutionDate: Date;

  @Column({ type: 'text' })
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
