import { IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateVenueRatingDto {
  @IsInt()
  @IsNotEmpty()
  venueId: number;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  review?: string;
}

export class UpdateVenueRatingDto {


  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  review?: string;
}
