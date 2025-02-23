import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { PackagePriceUpdate } from 'common/package-price-updater.service';
import { CreateVenuePackageServiceDto } from 'dto/venue/venue_package_service.dto';
import { Service } from 'entity/venue/service.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePackageService } from 'entity/venue/venue_package_service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenuePackageServiceService extends BaseService<VenuePackageService> {
  constructor(
    @InjectRepository(VenuePackageService) private venuePackageServicerepo: Repository<VenuePackageService>,
    @InjectRepository(VenuePackage) readonly packageRepo: Repository<VenuePackage>,
    @InjectRepository(Service) readonly serviceRepo: Repository<Service>,
    private readonly priceUpdater: PackagePriceUpdate,
  ) {
    super(venuePackageServicerepo);
  }



  async addServiceToPackage(dto: CreateVenuePackageServiceDto): Promise<VenuePackageService> {
    const service = await this.serviceRepo.findOne({ where : {id : dto.service } });
  
    if (!service) {
      throw new Error('Service not found');
    }
  
    const venuePackageService = this.venuePackageServicerepo.create({ 
      package: { id: dto.package }, 
      service, 
      price: dto.price ,
      count: dto.count,
    });
  
    await this.venuePackageServicerepo.save(venuePackageService);
    await this.priceUpdater.updatePackagePrice(dto.package);
  
    return venuePackageService;
  }


  async getPackageServices(packageId: number) {
    return this.venuePackageServicerepo.find({ where: { package: { id: packageId } }, relations: ['service' , "service.iconMedia" ]  })  ;
  }
  


  async updateServiceInPackage(id: number, newPrice: number, newCount: number) {
    const venuePackageService = await this.venuePackageServicerepo.findOne({ where: { id }, relations: ['service' , "service.iconMedia" , "package" ] });
    if (!venuePackageService) {
      throw new NotFoundException('Service not found in package');
    }

    venuePackageService.price = newPrice;
    venuePackageService.count = newCount;
    await this.venuePackageServicerepo.save(venuePackageService);
    await this.priceUpdater.updatePackagePrice(venuePackageService.package.id);

    return venuePackageService;
  }

  async removeServiceFromPackage(id: number) {
    const venuePackageService = await this.venuePackageServicerepo.findOne({ where: { id }, relations: ['package'] });

    if (!venuePackageService) {
      throw new Error('Service not found in package');
    }

    await this.venuePackageServicerepo.remove(venuePackageService);
    await this.priceUpdater.updatePackagePrice(venuePackageService.package.id);

    return { message: 'Service removed from package successfully' };
  }
}
