import { Module } from '@nestjs/common';
import { OccasionTypeService } from './occasion_type.service';
import { OccasionTypeController } from './occasion_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccasionType } from 'entity/venue/occasion_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OccasionType])],
  controllers: [OccasionTypeController],
  providers: [OccasionTypeService],
})
export class OccasionTypeModule {}
