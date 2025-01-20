// src/modules/vendors/vendor.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorController } from './vendors.controller';
import { VendorService } from './vendors.service';
import { VendorSchema } from 'schemas/vendor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Vendor", schema: VendorSchema }]),
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}