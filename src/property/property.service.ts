// @Injectable()
// export class PropertyService extends BaseService<Property> {
//   constructor(
//     @InjectRepository(Property)
//     private propertyRepository: Repository<Property>,
//   ) {
//     super(propertyRepository)
//   }

// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'entity/property/property.entity';
import { City } from 'entity/property/city.entity';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto ,UpdatePropertyDto } from 'dto/property/property.dto';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class PropertyService extends BaseService<Property> {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {
    super(propertyRepository);
  }

}
