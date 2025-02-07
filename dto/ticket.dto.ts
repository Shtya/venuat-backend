import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsInt } from 'class-validator';
import { TicketStatus } from 'entity/user/ticket.entity';

export class CreateTicketDto {
  @IsInt({ message: 'events.user_id_integer' })
  @IsNotEmpty({ message: 'events.user_id_required' })
  userId: number;

  @IsInt({ message: 'events.vendor_id_integer' })
  @IsOptional()
  vendorId?: number;

  @IsString({ message: 'events.code_string' })
  @IsNotEmpty({ message: 'events.code_required' })
  code: string;

  @IsString({ message: 'events.description_string' })
  @IsNotEmpty({ message: 'events.description_required' })
  description: string;

  @IsEnum(TicketStatus, { message: 'events.invalid_status_in_tickets' })
  @IsOptional()
  status?: TicketStatus;

  @IsString({ message: 'events.body_string' })
  @IsNotEmpty({ message: 'events.body_required' })
  body: string;
}


export class UpdateTicketDto extends PartialType(CreateTicketDto) {}



