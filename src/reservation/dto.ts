import { IsString, IsNumber, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateReservationDto {
  @IsString()
  venueName: string; 

  @IsString()
  userName: string; 

  @IsNumber()
  amount: number; 

  @IsDateString()
  date: any; 
}



export class UpdateReservationDto extends PartialType(CreateReservationDto) {}