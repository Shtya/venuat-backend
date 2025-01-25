import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty({ message: 'Feature name should not be empty' })
  feature_name: any; // JSONB for multilingual support

  @IsNotEmpty({ message: 'Icon media ID should not be empty' })
  icon_media_id: number;
}



export class AddFeatureToVenueDto {
  @IsNotEmpty({ message: 'Feature ID should not be empty' })
  @IsNumber({}, { message: 'Feature ID should be a number' })
  feature_id: number;
}


export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
