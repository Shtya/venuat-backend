// src/service/service.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'entity/venue/service.entity';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) {
    super(serviceRepository);
  }
}
