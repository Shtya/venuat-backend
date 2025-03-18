import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('home_settings')
export class HomeSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  titleHome: { ar: string; en: string };

  @Column({ type: 'jsonb' })
  secondTitleHome: { ar: string; en: string };

  @Column({ type: 'text', nullable: true })
  urlVideo?: string;

  @Column({ type: 'simple-array', nullable: true })
  specialVenues?: number[]; // تخزين معرفات الأماكن المميزة كمصفوفة

  @Column({ type: 'simple-array', nullable: true })
  bestRatedVenues?: number[]; // تخزين معرفات الأماكن الأعلى تقييمًا كمصفوفة

  @Column({ type: 'jsonb' })
  termsAndCondition: { ar: string; en: string };

  @Column({ type: 'jsonb' })
  dataPrivacy: { ar: string; en: string };

  @Column({ type: 'jsonb' })
  necessaryLaws: { ar: string; en: string };



  @Column({ type: 'jsonb', nullable: true })
  faqs?: Array<{
    id: string;
    question: { ar: string; en: string };
    answer: { ar: string; en: string };
  }>;

  @Column({ type: 'jsonb', nullable: true })
  policies?: Array<{
    id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
  }>;

  @Column({ type: 'jsonb', nullable: true })
  socialMedia?: Array<{
    id: string;
    name: string;
    link: string;
  }>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
