import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateOccasionTypeDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsObject({ message: 'Name should be a JSON object' })
  name: any;
}


export class UpdateOccasionTypeDto extends PartialType(CreateOccasionTypeDto) {}
