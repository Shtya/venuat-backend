import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateTicketDto , UpdateTicketDto } from 'dto/ticket.dto';
import { TicketService } from './tickets.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { Ticket } from 'entity/user/ticket.entity';


@Controller('tickets')
export class TicketController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket) private readonly ticketRepository: Repository<Ticket>,
    private readonly i18n : I18nService ,
    private readonly ticketService: TicketService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.TICKETS_CREATE)
  async create(@Body() dto: CreateTicketDto) {
    await checkFieldExists(this.userRepository , {id : dto.userId } , this.i18n.t("events.user.not_found") , true , 404 )
    await checkFieldExists(this.userRepository , {id : dto.vendorId } , this.i18n.t("events.vendor.not_found") , true , 404 )
    await checkFieldExists(this.ticketRepository , {code : dto.code } , this.i18n.t("events.code_must_be_unique") , false , 409 )

    const { userId : user , vendorId : vendor , ...res } = dto
    return this.ticketService.create({user , vendor , ...res});
  }

  
  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.TICKETS_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.ticketService.FIND(
      'tickets',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ['user', 'vendor'],                // Relations 
      ["description" ,"status" ,"body" ,"code" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.TICKETS_READ)
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id , ['user', 'vendor']);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.TICKETS_UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
    await checkFieldExists(this.userRepository , {id : dto.userId } , this.i18n.t("events.user.not_found") , true , 404 )
    await checkFieldExists(this.userRepository , {id : dto.vendorId } , this.i18n.t("events.vendor.not_found") , true , 404 )

    
    const { userId : user , vendorId : vendor , ...res } = dto
    return this.ticketService.update(+id, {user , vendor , ...res});
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.TICKETS_DELETE)
  async remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
