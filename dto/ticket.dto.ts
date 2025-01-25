import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'Code must be a string.' })
  @IsNotEmpty({ message: 'Code is required.' })
  code: string;

  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @IsString({ message: 'Status must be a string.' })
  @IsNotEmpty({ message: 'Status is required.' })
  status: string;

  @IsDate({ message: 'Submission date must be a valid date.' })
  @IsNotEmpty({ message: 'Submission date is required.' })
  submission_date: Date;

  @IsDate({ message: 'Resolution date must be a valid date.' })
  @IsOptional()
  resolution_date: Date;

  @IsString({ message: 'Body must be a string.' })
  @IsNotEmpty({ message: 'Body is required.' })
  body: string;
}