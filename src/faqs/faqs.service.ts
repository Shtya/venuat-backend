import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { VenueFAQ } from 'entity/venue/venue_faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenueFaqService extends BaseService<VenueFAQ> {
  constructor(
    @InjectRepository(VenueFAQ)
    private venueFaqRepository: Repository<VenueFAQ>
  ) {
    super(venueFaqRepository);
  }
}
