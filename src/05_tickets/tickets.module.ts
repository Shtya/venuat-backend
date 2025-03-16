import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './tickets.service';
import { TicketController } from './tickets.controller';
import { Ticket } from 'entity/user/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]) ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
