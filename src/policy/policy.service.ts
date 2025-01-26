import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'common/base/base.service';
import { Policy } from 'entity/venue/policy.entity';

@Injectable()
export class PoliciesService extends BaseService<Policy> {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {
    super(policyRepository)
  }

}