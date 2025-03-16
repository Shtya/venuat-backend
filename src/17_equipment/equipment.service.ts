import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'entity/venue/equipment.entity';
import { BaseService } from 'common/base/base.service';
import { CreateEquipmentDto } from 'dto/venue/equipment.dto';

@Injectable()
export class EquipmentService extends BaseService<Equipment> {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>
  ) {
    super(equipmentRepository);
  }


  async customCreate(dto: CreateEquipmentDto, userId: number, isAdmin: boolean): Promise<Equipment> {
    const equipment = this.equipmentRepository.create(dto);
  
    if (!isAdmin) {
      equipment.user_id = userId;
      equipment.is_predefined = false; // Vendor equipment cannot be global
    } else {
      equipment.is_predefined = true; 
      equipment.user_id = null;
    }
  
    return await this.equipmentRepository.save(equipment);
  }


  async findGlobalAndUserEquipment(userId: number) {

    return this.equipmentRepository.find({where: [{ user_id: userId } , {is_predefined : true} ]})
}


  
}
