import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueFAQ } from 'entity/venue/venue_faq.entity';
import { VenueFaqService } from './faqs.service';
import { VenueFaqController } from './faqs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VenueFAQ])],
  controllers: [VenueFaqController],
  providers: [VenueFaqService],
})
export class FaqsModule {}
