import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'entity/property/property.entity';
import { City } from 'entity/property/city.entity';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class PropertyService extends BaseService<Property> {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {
    super(propertyRepository);
  }

  async findOneWithVenues(id: number): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['venue'],
    });

    if (!property) {
      throw new NotFoundException(this.i18n.t("events.property_not_found" , {args : {id}}));
    }

    return property;
  }
}
