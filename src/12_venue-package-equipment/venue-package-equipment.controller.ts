import { Controller, Post, Get, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateVenuePackageEquipmentDto } from 'dto/venue/venue_package_equipment.dto';
import { VenuePackageEquipmentService } from './venue-package-equipment.service';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'entity/venue/equipment.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { AuthGuard } from 'src/1_auth/auth.guard';
import { Permissions } from 'src/1_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-package-equipments')
export class VenuePackageEquipmentController {
  constructor(
    @InjectRepository(VenuePackage) readonly packageRepo: Repository<VenuePackage>,
    @InjectRepository(Equipment) readonly serviceRepo: Repository<Equipment>,
    private readonly service: VenuePackageEquipmentService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_CREATE)
  async create(@Body() dto: CreateVenuePackageEquipmentDto) {
    await checkFieldExists(this.packageRepo, { id: dto.package }, this.service.i18n.t('events.package_not_found') , true, 404); //! "Package doesn't exist."
    await checkFieldExists(this.serviceRepo, { id: dto.equipment }, this.service.i18n.t('events.equipment_not_found2') , true, 404); //! "equipment doesn't exist."
    return this.service.addEquipmentToPackage(dto);
  }

  

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_READ)
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams } = query;

    return this.service.FIND(
      'venue_package_equipment',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [], // exclude some fields
      ['package'], // Relations
      ['count' , "price"], // search parameters
      restQueryParams // search with fields
    );
  }

  @Get(':packageId/equipment')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_READ)
  async getEquipments(@Param('packageId') packageId: number) {
    return this.service.getPackageEquipment(packageId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_EQUIPMENT_DELETE)
  async delete(@Param('id') id: number) {
    await this.service.deleteEquipmentAndUpdatePrice(id);
  }
}
