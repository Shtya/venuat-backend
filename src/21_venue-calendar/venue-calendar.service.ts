import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { VenueCalendar } from 'entity/venue/venue_calendar.entity';
import { Venue } from 'entity/venue/venue.entity';
import { CreateVenueCalendarDto, UpdateVenueCalendarDto } from 'dto/venue/calendar.dto';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class VenueCalendarService extends BaseService<VenueCalendar> {
  constructor(
    @InjectRepository(VenueCalendar)
    private venueCalendarRepository: Repository<VenueCalendar>,
    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>
  ) {
    super(venueCalendarRepository);
  }

  private async checkForOverlappingDates(venueId: number, dateFrom: Date, dateTo: Date, excludeId?: number): Promise<void> {
    const overlappingEntry = await this.venueCalendarRepository
      .createQueryBuilder('venue_calendar')
      .where('venue_calendar.venue_id = :venueId', { venueId })
      .andWhere(
        `
        (
          (:dateFrom BETWEEN venue_calendar.date_from AND venue_calendar.date_to) OR
          (:dateTo BETWEEN venue_calendar.date_from AND venue_calendar.date_to) OR
          (venue_calendar.date_from BETWEEN :dateFrom AND :dateTo) OR
          (venue_calendar.date_to BETWEEN :dateFrom AND :dateTo)
        )
        `,
        { dateFrom, dateTo }
      )
      .andWhere(excludeId ? 'venue_calendar.id != :excludeId' : '1=1', { excludeId })
      .getOne();

    if (overlappingEntry) {
      throw new ConflictException(this.i18n.t("events.date_range_overlap")); //!
    }
  }



  // Create a new calendar entry
  async createCustom(dto: CreateVenueCalendarDto): Promise<VenueCalendar> {
    const venue = await this.venueRepository.findOne({
      where: { id: dto.venue_id },
    });

    if (!venue) {
      throw new NotFoundException(this.i18n.t("events.venue_not_found", { args: { venue_id: dto.venue_id } })); //!
    }

    // Check for overlapping dates
    await this.checkForOverlappingDates(dto.venue_id, dto.date_from, dto.date_to);

    const calendarEntry = this.venueCalendarRepository.create({
      ...dto,
      venue_id: dto.venue_id,
    });

    return this.venueCalendarRepository.save(calendarEntry);
  }

  // Update a calendar entry
  async updateCustom(id: number, updateVenueCalendarDto: UpdateVenueCalendarDto) {
    const calendarEntry = await this.findOne(id);

    // Check for overlapping dates (excluding the current entry)
    if (updateVenueCalendarDto.date_from || updateVenueCalendarDto.date_to) {
      await this.checkForOverlappingDates(calendarEntry.venue.id, updateVenueCalendarDto.date_from || calendarEntry.date_from, updateVenueCalendarDto.date_to || calendarEntry.date_to, id);
    }

    this.venueCalendarRepository.merge(calendarEntry, updateVenueCalendarDto);
    return this.venueCalendarRepository.save(calendarEntry);
  }
}
