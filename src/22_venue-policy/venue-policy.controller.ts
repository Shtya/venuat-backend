import { Controller, Get, Post, Param, Delete, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { VenuePolicyService } from './venue-policy.service';
import { AddPoliciesToVenueDto, AddPolicyToVenueDto } from 'dto/policy/policy.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venues')
export class VenuePolicyController {
  constructor(private readonly venuePolicyService: VenuePolicyService) {}


   @Post("/multi-policies")
    @UseGuards(AuthGuard)
    async create(@Body() dtos) {
     return this.venuePolicyService.addPoliciesToVenue2(dtos)
    }
  



  // Add a policy to a venue
  @Post(':id/add-policy')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_CREATE)
  async addPolicyToVenue(@Param('id') venueId: number, @Body() addPolicyToVenueDto: AddPolicyToVenueDto) {
    return this.venuePolicyService.addPolicyToVenue(venueId, addPolicyToVenueDto);
  }


  // 
  @Post(':id/add-policies')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_CREATE)
  async addPoliciesToVenue(
      @Param('id') venueId: number,
      @Body() addPolicyToVenueDto: AddPoliciesToVenueDto
  ) {
      return this.venuePolicyService.addPoliciesToVenue(venueId, addPolicyToVenueDto);
  }


  // Remove a policy from a venue
  @Delete(':id/remove-policy/:policyId')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_DELETE)
  async removePolicyFromVenue(@Param('id') venueId: number, @Param('policyId') policyId: number): Promise<{ message: string }> {
    return this.venuePolicyService.removePolicyFromVenue(venueId, policyId);
  }

  // Get all policies for a venue
  @Get(':id/policies')
  async getPoliciesForVenue(@Param('id') venueId: number) {
    return this.venuePolicyService.getPoliciesForVenue(venueId);
  }
}
