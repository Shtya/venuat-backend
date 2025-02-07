import { Controller, Get, Post, Param, Delete, Body, NotFoundException } from '@nestjs/common';
import { VenuePolicyService } from './venue-policy.service';
import { AddPolicyToVenueDto } from 'dto/policy/policy.dto';

@Controller('venues')
export class VenuePolicyController {
  constructor(private readonly venuePolicyService: VenuePolicyService) {}

  // Add a policy to a venue
  @Post(':id/add-policy')
  async addPolicyToVenue(@Param('id') venueId: number, @Body() addPolicyToVenueDto: AddPolicyToVenueDto) {
    return this.venuePolicyService.addPolicyToVenue(venueId, addPolicyToVenueDto);
  }

  // Remove a policy from a venue
  @Delete(':id/remove-policy/:policyId')
  async removePolicyFromVenue(@Param('id') venueId: number, @Param('policyId') policyId: number): Promise<{ message: string }> {
    return this.venuePolicyService.removePolicyFromVenue(venueId, policyId);
  }

  // Get all policies for a venue
  @Get(':id/policies')
  async getPoliciesForVenue(@Param('id') venueId: number): Promise<any[]> {
    return this.venuePolicyService.getPoliciesForVenue(venueId);
  }
}
