import { Module } from '@nestjs/common';
import { VenueEquipmentService } from './venue-equipment.service';
import { VenueEquipmentController } from './venue-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEquipment } from 'entity/venue/venue_equipment.entity';
import { Equipment } from 'entity/venue/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEquipment, Equipment])],
  controllers: [VenueEquipmentController],
  providers: [VenueEquipmentService],
})
export class VenueEquipmentModule {}
