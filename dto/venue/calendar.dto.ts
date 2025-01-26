import { IsNotEmpty, IsObject, IsNumber, IsDateString , IsOptional } from 'class-validator';

export class CreateVenueCalendarDto {
  @IsNumber({}, { message: 'Venue ID must be a number.' })
  @IsNotEmpty({ message: 'Venue ID is required.' })
  venue_id: number;

  @IsObject({ message: 'Package name must be a JSON object.' })
  @IsNotEmpty({ message: 'Package name is required.' })
  package_name: Record<string, any>;

  @IsNumber({}, { message: 'Price must be a number.' })
  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  @IsDateString({}, { message: 'Date from must be a valid date.' })
  @IsNotEmpty({ message: 'Date from is required.' })
  date_from: Date;

  @IsDateString({}, { message: 'Date to must be a valid date.' })
  @IsNotEmpty({ message: 'Date to is required.' })
  date_to: Date;
}



export class UpdateVenueCalendarDto {
  @IsObject({ message: 'Package name must be a JSON object.' })
  @IsOptional()
  package_name?: Record<string, any>;

  @IsNumber({}, { message: 'Price must be a number.' })
  @IsOptional()
  price?: number;

  @IsDateString({}, { message: 'Date from must be a valid date.' })
  @IsOptional()
  date_from?: Date;

  @IsDateString({}, { message: 'Date to must be a valid date.' })
  @IsOptional()
  date_to?: Date;
}