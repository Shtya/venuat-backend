import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateVenueRatingDto, UpdateVenueRatingDto } from 'dto/venue/venue_ratings.dto';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenueRating } from 'entity/venue/venue_ratings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenueRatingService extends BaseService<VenueRating> {
  constructor(
    @InjectRepository(VenueRating) private readonly venueRatingRepo: Repository<VenueRating>,
    @InjectRepository(Venue) private readonly venueRepo: Repository<Venue>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(venueRatingRepo);
  }

  async createCustom(dto: CreateVenueRatingDto, userId: number): Promise<VenueRating> {
    const venue = await this.venueRepo.findOne({ where: { id: dto.venueId } });
    if (!venue) throw new NotFoundException("This Venue doesn't exist.");

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");

    const rating = this.venueRatingRepo.create({ ...dto, venue, user });
    return this.venueRatingRepo.save(rating);
  }


}