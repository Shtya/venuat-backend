import { Controller, Post, Get, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateVenuePackageEquipmentDto } from 'dto/venue/venue_package_equipment.dto';
import { VenuePackageEquipmentService } from './venue-package-equipment.service';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'entity/venue/equipment.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-package-equipments')
export class VenuePackageEquipmentController {
  constructor(
    @InjectRepository(VenuePackage) readonly packageRepo: Repository<VenuePackage>,
    @InjectRepository(Equipment) readonly equipmentRepo: Repository<Equipment>,
    private readonly service: VenuePackageEquipmentService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_CREATE)
  async create(@Body() dto: CreateVenuePackageEquipmentDto) {
    await checkFieldExists(this.packageRepo, { id: dto.package }, 'Package not found', true, 404);
    await checkFieldExists(this.equipmentRepo, { id: dto.equipment }, 'Equipment not found', true, 404);
    return this.service.addEquipmentToPackage(dto);
  }

  @Get(':packageId/equipment')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_READ)
  async getEquipment(@Param('packageId') packageId: number) {
    return this.service.getPackageEquipment(packageId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_UPDATE)
  async updateEquipment(@Param('id') id: number, @Body('price') price: number, @Body('count') count: number) {
    return this.service.updateEquipmentInPackage(id, price, count);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_DELETE)
  async deleteEquipment(@Param('id') id: number) {
    return this.service.removeEquipmentFromPackage(id); 
  }
}