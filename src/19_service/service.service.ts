// src/service/service.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'entity/venue/service.entity';
import { BaseService } from 'common/base/base.service';
import { CreateServiceDto } from 'dto/venue/service.dto';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>
  ) {
    super(serviceRepository);
  }


  async customCreate(dto: CreateServiceDto, userId: number, isAdmin: boolean)  {
    const service = this.serviceRepository.create(dto);
  
    if (!isAdmin) {
      service.user_id = userId;
      service.is_predefined = false; // Vendor equipment cannot be global
    } else {
      service.is_predefined = true; 
      service.user_id = null;
    }
  
    return await this.serviceRepository.save(service);
  }
}
