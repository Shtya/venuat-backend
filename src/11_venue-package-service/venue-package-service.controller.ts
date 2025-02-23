import { Controller, Post, Get , Query , Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { VenuePackageServiceService } from './venue-package-service.service';
import { CreateVenuePackageServiceDto } from 'dto/venue/venue_package_service.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Repository } from 'typeorm';
import { Service } from 'entity/venue/service.entity';
import { I18nService } from 'nestjs-i18n';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';



@Controller('venue-package-services')
export class VenuePackageServiceController {
  constructor(
    private readonly i18n: I18nService,  //~! For internationalization.
    @InjectRepository(VenuePackage) readonly packageRepo: Repository<VenuePackage>,
    @InjectRepository(Service) readonly serviceRepo: Repository<Service>,
    private readonly service: VenuePackageServiceService) {}



  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_SERVICE_CREATE)
  async create(@Body() dto: CreateVenuePackageServiceDto) {
    await checkFieldExists( this.packageRepo , {id : dto.package} , this.i18n.t("events.package_not_exist") , true , 404  ) //~! Package doesn't exist. 
    await checkFieldExists( this.serviceRepo , {id : dto.service} , this.i18n.t("events.service_not_exist") , true , 404  ) //~! Service doesn't exist. 
    return this.service.addServiceToPackage(dto);
  }



  @Get(':packageId/services')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_SERVICE_READ)
  async getServices(@Param('packageId') packageId: number) {
    return this.service.getPackageServices(packageId);
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_SERVICE_UPDATE)
  async updateService(@Param('id') id: number, @Body('price') price: number , @Body('count') count: number) {
    return this.service.updateServiceInPackage(id, price , count);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_SERVICE_DELETE)
  async deleteService(@Param('id') id: number) {
    return this.service.removeServiceFromPackage(id);
  }



}
