import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { Ticket } from 'entity/user/ticket.entity'; 
import { Repository } from 'typeorm'; 

@Injectable()
export class TicketService extends BaseService<Ticket>  {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {
    super(ticketRepository ) 
  }

}
