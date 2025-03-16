import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Venue } from 'entity/venue/venue.entity';

@Injectable()
export class OccasionTypeService extends BaseService<OccasionType> {
  constructor(
    @InjectRepository(OccasionType)  private readonly occasionTypeRepository: Repository<OccasionType>,
     @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {
    super(occasionTypeRepository);
  }


  async findAllOccasionOnVenues (){
    const occasions = await this.venueRepository
  .createQueryBuilder("venue")
  .innerJoin("venue.occasion", "occasion")
  .select("DISTINCT occasion.id, occasion.name") // Select distinct occasions
  .getRawMany(); // Get raw results

  return occasions ;
  }
}
