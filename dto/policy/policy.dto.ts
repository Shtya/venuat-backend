import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreatePolicyDto {
  @IsObject({ message: 'Name must be a JSON object.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: Record<string, any>;

  @IsObject({ message: 'Description must be a JSON object.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: Record<string, any>;
}

export class UpdatePolicyDto {
  @IsObject({ message: 'Name must be a JSON object.' })
  @IsOptional()
  name?: Record<string, any>;

  @IsObject({ message: 'Description must be a JSON object.' })
  @IsOptional()
  description?: Record<string, any>;
}

export class AddPolicyToVenueDto {
  @IsNumber({}, { message: 'Policy ID must be a number.' })
  @IsNotEmpty({ message: 'Policy ID is required.' })
  policy_id: number;
}


export class CreateVenuePolicyDto {
  @IsNumber({}, { message: 'Venue ID must be a number.' })
  @IsNotEmpty({ message: 'Venue ID is required.' })
  venue_id: number;

  @IsNumber({}, { message: 'Policy ID must be a number.' })
  @IsNotEmpty({ message: 'Policy ID is required.' })
  policy_id: number;
}

export class UpdateVenuePolicyDto {
  @IsNumber({}, { message: 'Venue ID must be a number.' })
  @IsOptional()
  venue_id?: number;

  @IsNumber({}, { message: 'Policy ID must be a number.' })
  @IsOptional()
  policy_id?: number;
}