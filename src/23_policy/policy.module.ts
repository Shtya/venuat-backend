import { Module } from '@nestjs/common';
import { PoliciesService } from './policy.service';
import { PoliciesController } from './policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from 'entity/venue/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PolicyModule {}
