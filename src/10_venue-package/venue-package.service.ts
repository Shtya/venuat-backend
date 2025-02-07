import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class VenuePackageService extends BaseService<VenuePackage> {
  constructor(
    @InjectRepository(VenuePackage)
    private venuePackageRepo: Repository<VenuePackage>) {
    super(venuePackageRepo);
  }

}
