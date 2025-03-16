import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateOccasionTypeDto {
  @IsNotEmpty({ message: 'events.occasion_type.name_required' })
  @IsObject({ message: 'events.occasion_type.name_invalid' })
  name: any;
}

export class UpdateOccasionTypeDto extends PartialType(CreateOccasionTypeDto) {}
