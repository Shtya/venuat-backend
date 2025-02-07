import { Module } from '@nestjs/common';
import { VenuePolicyService } from './venue-policy.service';
import { VenuePolicyController } from './venue-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from 'entity/venue/policy.entity';
import { VenuePolicy } from 'entity/venue/venue_policy.entity';
import { Venue } from 'entity/venue/venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy, VenuePolicy, Venue])],
  controllers: [VenuePolicyController],
  providers: [VenuePolicyService],
})
export class VenuePolicyModule {}
