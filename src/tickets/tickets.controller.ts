import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateTicketDto , UpdateTicketDto } from 'dto/ticket.dto';
import { TicketService } from './tickets.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';


@Controller('tickets')
export class TicketController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly i18n : I18nService ,
    private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() dto: CreateTicketDto) {
    await checkFieldExists(this.userRepository , {id : dto.userId } , this.i18n.t("events.user.not_found") , true , 404 )
    await checkFieldExists(this.userRepository , {id : dto.vendorId } , this.i18n.t("events.vendor.not_found") , true , 404 )

    const { userId : user , vendorId : vendor , ...res } = dto
    return this.ticketService.create({user , vendor , ...res});
  }

  
  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    

    return this.ticketService.FIND(
      'tickets',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [ ],        // exclude some fields
      ['user', 'vendor'],                   // Relations 
      ["description" ,"status" ,"body" ,"code" ], // search parameters
      restQueryParams                             // search with fields
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id , ['user', 'vendor']);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
    await checkFieldExists(this.userRepository , {id : dto.userId } , this.i18n.t("events.user.not_found") , true , 404 )
    await checkFieldExists(this.userRepository , {id : dto.vendorId } , this.i18n.t("events.vendor.not_found") , true , 404 )

    
    const { userId : user , vendorId : vendor , ...res } = dto
    return this.ticketService.update(+id, {user , vendor , ...res});
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
