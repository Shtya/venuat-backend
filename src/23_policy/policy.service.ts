import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'common/base/base.service';
import { Policy } from 'entity/venue/policy.entity';

@Injectable()
export class PoliciesService extends BaseService<Policy> {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>
  ) {
    super(policyRepository);
  }



    async customCreate(dto , userId: number, isAdmin: boolean)  {
      const policy : any = this.policyRepository.create(dto);
    
      if (!isAdmin) {
        policy.user_id = userId;
        policy.is_predefined = false; // Vendor equipment cannot be global
      } else {
        policy.is_predefined = true; 
        policy.user_id = null;
      }
    
      return await this.policyRepository.save(policy);
    }



    async customCreateBult(dto , userId: number, isAdmin: boolean) {
      const policies = Array.isArray(dto) ? dto : [dto]; // التأكد من أن الإدخال مصفوفة
      
      const createdPolicies = policies.map((policyDto) => {
        const policy: any = this.policyRepository.create(policyDto);
    
        if (!isAdmin) {
          policy.user_id = userId;
          policy.is_predefined = false; // Vendor equipment cannot be global
        } else {
          policy.is_predefined = true;
          policy.user_id = null;
        }
    
        return policy;
      });
    
      return await this.policyRepository.save(createdPolicies);
    }
    
  
  
    async findGlobalAndUserEquipment(userId: number) {
  
      return this.policyRepository.find({where: [{ user_id: userId } , {is_predefined : true} ]})
  }
}
