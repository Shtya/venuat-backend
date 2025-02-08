import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from 'entity/venue/feature.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class FeatureService extends BaseService<Feature> {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>
  ) {
    super(featureRepository);
  }

  // async removeSoftDelete(id: number) {
  //   const feature = await this.featureRepository.findOne({ where: { id } });
  //   if (!feature) {
  //     throw new NotFoundException(`Feature with ID ${id} not found`);
  //   }
  //   await this.featureRepository.softDelete(id);
  //   return { message: `Feature with ID ${id} has been soft deleted successfully.` };
  // }
}
