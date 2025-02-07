import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("website_settings")
export class WebsiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb' , { nullable: true })
  pages: { 
    id: string; 
    ar: string; 
    en: string; 
  }[];  // Each page will now have a unique ID

  @Column('jsonb' ,{ nullable: true })
  termsAndCondition: Record<string, string>;

  @Column('jsonb' ,{ nullable: true })
  faqs: { 
    id: string;
    question: Record<string, string>; 
    answer: Record<string, string>; 
  }[]; // Each FAQ will now have a unique ID
}
