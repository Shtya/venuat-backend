import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'entity/venue/equipment.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class EquipmentService extends BaseService<Equipment> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>
  ) {
    super(equipmentRepository);
  }
}
