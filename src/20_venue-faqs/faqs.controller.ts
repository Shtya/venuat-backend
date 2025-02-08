import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { VenueFAQ } from 'entity/venue/venue_faq.entity';
import { VenueFaqService } from './faqs.service';
import { CreateVenueFaqDto, UpdateVenueFaqDto } from 'dto/faqs/faqs.dto';
import { Venue } from 'entity/venue/venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/1_auth/auth.guard';
import { Permissions } from 'src/1_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-faq')
export class VenueFaqController {
  constructor(
    @InjectRepository(VenueFAQ)
    private venueFaqRepository: Repository<VenueFAQ>,

    @InjectRepository(Venue)
    private venueRepository: Repository<Venue>,
    private readonly venueFaqService: VenueFaqService
  ) {}



  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_CREATE)
  async create(@Body() dto: CreateVenueFaqDto) {
    const venue = await this.venueRepository.findOne({ where: { id: dto.venue_id }  });

    if (!venue) throw new NotFoundException( this.venueFaqService.i18n.t("events.venue_not_found2", { args: { venue_id: dto.venue_id } })); 
    const faq = this.venueFaqRepository.create({ ...dto, venue });
    return this.venueFaqRepository.save(faq);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_READ)
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams } = query;

    return this.venueFaqService.FIND(
      'venue_faq',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [], // exclude some fields
      [], // Relations
      ['question', 'answer'], // search parameters
      restQueryParams // search with fields
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_READ)
  findOne(@Param('id') id: number) {
    return this.venueFaqService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_UPDATE)
  async update(@Param('id') id: number, @Body() dto: UpdateVenueFaqDto) {

    const anyDto : any = dto
    if(anyDto.venue ){
      const venue = await this.venueRepository.findOne({ where: { id: anyDto.venue }  });
      if (!venue) throw new NotFoundException( this.venueFaqService.i18n.t("events.venue_not_found2", { args: { venue: anyDto.venue } })); 
    }
    return this.venueFaqService.update(id, dto );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_DELETE)
  remove(@Param('id') id: number) {
    return this.venueFaqService.remove(id);
  }
}
