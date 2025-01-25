import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateOccasionTypeDto , UpdateOccasionTypeDto } from 'dto/venue/occasion_type.dto';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OccasionTypeService extends BaseService<OccasionType> {
  constructor(
    @InjectRepository(OccasionType)
    private readonly occasionTypeRepository: Repository<OccasionType>,
  ){
    super(occasionTypeRepository)
  }
  
}
