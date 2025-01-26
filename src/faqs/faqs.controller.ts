import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { VenueFAQ } from 'entity/venue/venue_faq.entity';
import { VenueFaqService } from './faqs.service';
import { CreateVenueFaqDto, UpdateVenueFaqDto } from 'dto/faqs/faqs.dto';
import { Venue } from 'entity/venue/venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  async create(@Body() dto: CreateVenueFaqDto) {
    const venue = await this.venueRepository.findOne({
      where: { id: dto.venue_id },
    });

    if (!venue) 
      throw new NotFoundException(`Venue with ID ${dto.venue_id} not found` );
  
    const faq = this.venueFaqRepository.create({...dto , venue} );

    return this.venueFaqRepository.save(faq);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , question , answer } = query;
    return this.venueFaqService.findAll(
      "venue_faq" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "question" ,"answer"], // search
      {  }, 
      [  ] // show fileds
    );
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.venueFaqService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateVenueFaqDto: UpdateVenueFaqDto) {
    return this.venueFaqService.update(id, updateVenueFaqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.venueFaqService.remove(id);
  }
}
