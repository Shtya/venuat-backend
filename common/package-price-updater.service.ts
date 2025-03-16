import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackageService } from 'entity/venue/venue_package_service.entity';
import { Repository } from 'typeorm';
import { Venue } from 'entity/venue/venue.entity'; 

@Injectable()
export class PackagePriceUpdate {
  constructor(
    @InjectRepository(VenuePackage)
    private readonly venuePackageRepo: Repository<VenuePackage>,

    @InjectRepository(VenuePackageService)
    private readonly venuePackageServiceRepo: Repository<VenuePackageService>,

    @InjectRepository(VenuePackageEquipment)
    private readonly venuePackageEquipmentRepo: Repository<VenuePackageEquipment>,

    @InjectRepository(Venue)  
    private readonly venueRepo: Repository<Venue>,
  ) {}

  async updatePackagePrice(packageId: number): Promise<void> {
    
    const services = await this.venuePackageServiceRepo.find({ where: { package: { id: packageId } } });
    const equipments = await this.venuePackageEquipmentRepo.find({ where: { package: { id: packageId } } });
    
    
    const totalServicePrice = services.reduce((sum, service) => sum + Number(service.price) * service.count, 0);
    const totalEquipmentPrice = equipments.reduce((sum, equipment) => sum + (Number(equipment.price) * equipment.count), 0);
    
    
    const venuePackage = await this.venuePackageRepo.findOne({ where: { id: packageId } });
    const venue :any = await this.venueRepo.find({ where: { id: venuePackage.venue_id } });

   const venuePrice = venue?.[0].price ?? 0; 

   const totalPrice = totalServicePrice + totalEquipmentPrice + venuePrice;

   // Update the venue package with the calculated price
   await this.venuePackageRepo.update(packageId, { package_price: totalPrice });
  }
}
