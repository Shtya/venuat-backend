// src/property/property.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from 'entity/property/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
