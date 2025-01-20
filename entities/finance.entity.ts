import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: true })
  vendorName: { en: string; ar: string }; // Localized vendor name

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balanceWithdrawn: number;

  @Column('decimal', { precision: 10, scale: 2 })
  remainingBalance: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  iban: string;


  @Column('decimal', { precision: 10, scale: 2 , nullable: true })
  balanceAfterTransaction: number;

  @Column('decimal', { precision: 10, scale: 2 , nullable: true })
  balanceBeforeTransaction: number;

  @Column({nullable: true })
  to: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;
}
