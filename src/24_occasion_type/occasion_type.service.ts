import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';
import { OccasionType } from 'entity/venue/occasion_type.entity';

@Injectable()
export class OccasionTypeService extends BaseService<OccasionType> {
  constructor(
    @InjectRepository(OccasionType)
    private readonly occasionTypeRepository: Repository<OccasionType>
  ) {
    super(occasionTypeRepository);
  }
}
