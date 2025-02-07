import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagePriceUpdate } from './package-price-updater.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [PackagePriceUpdate],
  exports: [PackagePriceUpdate], // ✅ متاح لجميع الموديولات
})
export class CommonModule {}
