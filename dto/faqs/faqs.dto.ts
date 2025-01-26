import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateVenueFaqDto {
  @IsNumber({}, { message: 'Venue ID must be a number.' })
  @IsNotEmpty({ message: 'Venue ID is required.' })
  venue_id: number;


  @IsObject({ message: 'Question must be a JSON object.' })
  @IsNotEmpty({ message: 'Question is required.' })
  question: Record<string, any>;

  @IsObject({ message: 'Answer must be a JSON object.' })
  @IsNotEmpty({ message: 'Answer is required.' })
  answer: Record<string, any>;
}


export class UpdateVenueFaqDto {
	@IsObject({ message: 'Question must be a JSON object.' })
	@IsOptional()
	question?: Record<string, any>;
  
	@IsObject({ message: 'Answer must be a JSON object.' })
	@IsOptional()
	answer?: Record<string, any>;
  }