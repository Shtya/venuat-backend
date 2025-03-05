import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPoliciesToVenueDto, AddPolicyToVenueDto } from 'dto/policy/policy.dto';
import { Policy } from 'entity/venue/policy.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePolicy } from 'entity/venue/venue_policy.entity';
import { I18nService } from 'nestjs-i18n';
import { In, Repository } from 'typeorm';

@Injectable()
export class VenuePolicyService {
  constructor(
    @InjectRepository(VenuePolicy)
    private venuePolicyRepository: Repository<VenuePolicy>,
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    private readonly i18n: I18nService,
  ) {}

  // Add a policy to a venue
  async addPolicyToVenue(venueId: number, addPolicyToVenueDto: AddPolicyToVenueDto): Promise<VenuePolicy> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException( this.i18n.t("events.venue_not_found2", { args: { venueId } }) );
    }

    const policy = await this.policyRepository.findOne({
      where: { id: addPolicyToVenueDto.policy_id },
    });
    if (!policy) {
      throw new NotFoundException( this.i18n.t("events.policy_not_found", { args: { policy_id: addPolicyToVenueDto.policy_id } }) );
    }

    const venuePolicy = this.venuePolicyRepository.create({
      venue,
      policy,
    });

    return this.venuePolicyRepository.save(venuePolicy);
  }

  async addPoliciesToVenue2(dtos: { 
    venue_id: number; 
    policies: { name: { en: string; ar: string }; description: { en: string; ar: string } }[] 
}): Promise<VenuePolicy[]> {
    
    if (!Array.isArray(dtos.policies) || dtos.policies.length === 0) {
        throw new NotFoundException('Invalid input: Expected an array of Policies');
    }

    // البحث عن القاعة
    const venue = await this.venueRepository.findOne({ where: { id: dtos.venue_id } });
    if (!venue) {
        throw new NotFoundException(this.i18n.t('events.venue_not_found2', { args: { venue_id: dtos.venue_id } }));
    }

    const policiesToSave = [];
    
    for (const policyDto of dtos.policies) {
        // البحث عن السياسة باستخدام الاسم الإنجليزي
        let policy = await this.policyRepository.findOne({ where: { name: policyDto.name.en } });

        // إذا لم تكن موجودة، يتم إنشاؤها
        if (!policy) {
            policy = this.policyRepository.create({ 
                name: policyDto.name, 
                description: policyDto.description 
            });
            policy = await this.policyRepository.save(policy);
        }

        // إنشاء الربط بين القاعة والسياسة
        const venuePolicy = this.venuePolicyRepository.create({ venue, policy });
        policiesToSave.push(venuePolicy);
    }

    return this.venuePolicyRepository.save(policiesToSave);
}





  async addPoliciesToVenue(venueId: number, addPolicyToVenueDto: AddPoliciesToVenueDto): Promise<VenuePolicy[]> {
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
        throw new NotFoundException(this.i18n.t("events.venue_not_found2", { args: { venueId } }));
    }

    // Find all requested policies
    const policies = await this.policyRepository.findBy({
        id: In(addPolicyToVenueDto.policy_ids),
    });

    if (policies.length !== addPolicyToVenueDto.policy_ids.length) {
        throw new NotFoundException(this.i18n.t("events.some_policies_not_found"));
    }

    // Get already existing policies for this venue
    const existingVenuePolicies = await this.venuePolicyRepository.find({
        where: { venue: { id: venueId } },
        relations: ['policy'], // Ensure policies are loaded
    });

    const existingPolicyIds = new Set(existingVenuePolicies.map(vp => vp.policy.id));

    // Filter out policies that are already assigned to the venue
    const newPolicies = policies.filter(policy => !existingPolicyIds.has(policy.id));

    // If all policies are already assigned, return an empty array
    if (newPolicies.length === 0) {
        return [];
    }

    // Create venue policies for only new policies
    const venuePolicies = newPolicies.map(policy =>
        this.venuePolicyRepository.create({ venue, policy })
    );

    return this.venuePolicyRepository.save(venuePolicies);
}




  // Remove a policy from a venue
  async removePolicyFromVenue(venueId: number, policyId: number): Promise<{ message: string }> {
    const venuePolicy = await this.venuePolicyRepository.findOne({
      where: { venue: { id: venueId }, policy: { id: policyId } },
    });

    if (!venuePolicy) {
      throw new NotFoundException( this.i18n.t("events.policy_not_found_for_venue", { args: { policyId, venueId } }) );
    }

    await this.venuePolicyRepository.remove(venuePolicy);
    return { message:  this.i18n.t("events.policy_removed_from_venue", { args: { policyId, venueId } })  };
  }

  // Get all policies for a venue
  async getPoliciesForVenue(venueId: number): Promise<any[]> {
    // البحث عن القاعة
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    if (!venue) {
        throw new NotFoundException(this.i18n.t("events.venue_not_found2", { args: { venueId } }));
    }

    // جلب السياسات المرتبطة بهذه القاعة
    const venuePolicies = await this.venuePolicyRepository.find({
        where: { venue: { id: venueId } },
        relations: ['policy'], // تحميل بيانات السياسات
    });

    // تحويل البيانات إلى تنسيق يدعم الترجمة
    return venuePolicies.map(vp => ({
        id: vp.policy.id,
        name: {
            en: vp.policy.name?.en || "N/A",
            ar: vp.policy.name?.ar || "غير متوفر"
        },
        description: {
            en: vp.policy.description?.en || "N/A",
            ar: vp.policy.description?.ar || "غير متوفر"
        },
        created_at: vp.created_at,
        updated_at: vp.updated_at,
    }));
}

}
