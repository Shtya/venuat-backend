import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { VenueCalendarService } from './venue-calendar.service';
import { VenueCalendar } from 'entity/venue/venue_calendar.entity';
import { CreateVenueCalendarDto, UpdateVenueCalendarDto } from 'dto/venue/calendar.dto';

@Controller('venue-calendar')
export class VenueCalendarController {
  constructor(private readonly venueCalendarService: VenueCalendarService) {}

  @Post()
  createCustom(@Body() createVenueCalendarDto: CreateVenueCalendarDto) {
    return this.venueCalendarService.create(createVenueCalendarDto);
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder } = query;
    return this.venueCalendarService.findAll(
      'venue_calendar',
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ['package_name', 'price', 'date_from', 'date_to'], // search
      {}, // filer
      [], // show fileds
      ['venue']
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<VenueCalendar> {
    return this.venueCalendarService.findOne(id, ['venue']);
  }

  @Put(':id')
  updateCustom(@Param('id') id: number, @Body() updateVenueCalendarDto: UpdateVenueCalendarDto): Promise<VenueCalendar> {
    return this.venueCalendarService.update(id, updateVenueCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.venueCalendarService.remove(id);
  }
}
