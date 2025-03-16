import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { VenueCalendarService } from './venue-calendar.service';
import { VenueCalendar } from 'entity/venue/venue_calendar.entity';
import { CreateVenueCalendarDto, UpdateVenueCalendarDto } from 'dto/venue/calendar.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-calendar')
export class VenueCalendarController {
  constructor(private readonly venueCalendarService: VenueCalendarService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_CALENDAR_CREATE)
  createCustom(@Body() createVenueCalendarDto: CreateVenueCalendarDto) {
    return this.venueCalendarService.createCustom(createVenueCalendarDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_CALENDAR_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.venueCalendarService.FIND(
      'venue_calendar',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ['package_name', 'price', 'date_from', 'date_to' ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_CALENDAR_READ)
  findOne(@Param('id') id: number) {
    return this.venueCalendarService.findOne(id );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_CALENDAR_UPDATE)
  updateCustom(@Param('id') id: number, @Body() updateVenueCalendarDto: UpdateVenueCalendarDto): Promise<VenueCalendar> {
    return this.venueCalendarService.update(id, updateVenueCalendarDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_CALENDAR_DELETE)
  remove(@Param('id') id: number) {
    return this.venueCalendarService.remove(id);
  }
}
