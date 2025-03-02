import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { VenueFAQ } from 'entity/venue/venue_faq.entity';
import { VenueFaqService } from './faqs.service';
import { AnswerVenueFaqDto, CreateVenueFaqDto, UpdateVenueFaqDto } from 'dto/faqs/faqs.dto';
import { Venue } from 'entity/venue/venue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
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



  @Post('/question')
  @UseGuards(AuthGuard)
  async createQuestion(@Body() dto: CreateVenueFaqDto , @Req() req ) {
    const venue = await this.venueRepository.findOne({ where: { id: dto.venue_id } });

    if (!venue)  throw new NotFoundException(`Venue with ID ${dto.venue_id} not found`); 
    const faq = this.venueFaqRepository.create({ ...dto, venue , user_id : req?.user?.id , status: 'pending' });

    return this.venueFaqRepository.save(faq);
  }


  @Get('/pending/:venue_id')
  async getPendingQuestions(@Param('venue_id') venue_id: number) {
    return this.venueFaqRepository.find({ 
      where: { status: 'pending', venue: { id: venue_id } } 
    });
  }
  


  // * ✅ البائع يقوم بالإجابة على السؤال وتغيير حالته إلى "answered"
  @Put('/:id/answer')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_UPDATE)
  async answerQuestion(@Param('id') id: number, @Body() dto) {
    const faq = await this.venueFaqRepository.findOne({ where: { id } });

    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }

    // تحديث الجواب وتغيير الحالة إلى "answered"
    faq.answer = dto.answer;
    faq.question = dto.question;
    faq.status = 'answered';

    return this.venueFaqRepository.save(faq);
  }


  // * ✅ استرجاع جميع الأسئلة التي تمت الإجابة عليها فقط
  @Get('/answered')
  async findAnswered() {
    return this.venueFaqRepository.find({
      where: { status: 'answered' },
      order: { updated_at: 'DESC' }, // ترتيب الأجوبة من الأحدث إلى الأقدم
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_FAQ_CREATE)
  async create(@Body() dtos: CreateVenueFaqDto[]) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new NotFoundException('Invalid input: Expected an array of FAQs');
    }

    const faqsToSave = [];

    for (const dto of dtos) {
      const venue = await this.venueRepository.findOne({ where: { id: dto.venue_id } });

      if (!venue) {
        throw new NotFoundException(
          this.venueFaqService.i18n.t('events.venue_not_found2', { args: { venue_id: dto.venue_id } }),
        );
      }

      const faq = this.venueFaqRepository.create({ ...dto, venue });
      faqsToSave.push(faq);
    }

    return this.venueFaqRepository.save(faqsToSave);
  }

  @Get()
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
      ['question', 'answer' , "status" ], // search parameters
      {...restQueryParams , status :"answered"} , true , "answered"
    );
  }



  @Get("/questions-user")
  async findAll2(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams } = query;

    return this.venueFaqService.FIND(
      'venue_faq',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [], // exclude some fields
      ["venue"], // Relations
      ['question', 'answer' , "status" ], // search parameters
      {...restQueryParams , status :"pending"} 
    );
  }

  @Get(':id')
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
