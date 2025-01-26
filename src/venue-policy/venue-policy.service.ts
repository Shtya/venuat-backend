import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPolicyToVenueDto } from 'dto/policy/policy.dto';
import { Policy } from 'entity/venue/policy.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePolicy } from 'entity/venue/venue_policy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenuePolicyService {
  constructor(
    @InjectRepository(VenuePolicy)
    private venuePolicyRepository: Repository<VenuePolicy>,
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>
  ) {}

  // Add a policy to a venue
  async addPolicyToVenue(venueId: number, addPolicyToVenueDto: AddPolicyToVenueDto): Promise<VenuePolicy> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    const policy = await this.policyRepository.findOne({
      where: { id: addPolicyToVenueDto.policy_id },
    });
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${addPolicyToVenueDto.policy_id} not found`);
    }

    const venuePolicy = this.venuePolicyRepository.create({
      venue,
      policy,
    });

    return this.venuePolicyRepository.save(venuePolicy);
  }

  // Remove a policy from a venue
  async removePolicyFromVenue(venueId: number, policyId: number): Promise<{ message: string }> {
    const venuePolicy = await this.venuePolicyRepository.findOne({
      where: { venue: { id: venueId }, policy: { id: policyId } },
    });

    if (!venuePolicy) {
      throw new NotFoundException(`Policy with ID ${policyId} not found for Venue with ID ${venueId}`);
    }

    await this.venuePolicyRepository.remove(venuePolicy);
    return { message: `Policy with ID ${policyId} has been removed from Venue with ID ${venueId}` };
  }

  // Get all policies for a venue
  async getPoliciesForVenue(venueId: number): Promise<any[]> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    const venuePolicies = await this.venuePolicyRepository.find({
      where: { venue: { id: venueId } },
      relations: ['policy'], // Load the associated policy
    });

    return venuePolicies.map(vp => ({
      id: vp.policy.id,
      name: vp.policy.name,
      description: vp.policy.description,
      created_at: vp.created_at,
      updated_at: vp.updated_at,
    }));
  }
}
