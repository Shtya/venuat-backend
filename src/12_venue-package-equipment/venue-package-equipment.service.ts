import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { PackagePriceUpdate } from 'common/package-price-updater.service';
import { CreateVenuePackageEquipmentDto } from 'dto/venue/venue_package_equipment.dto';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Equipment } from 'entity/venue/equipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VenuePackageEquipmentService extends BaseService<VenuePackageEquipment> {
  constructor(
    @InjectRepository(VenuePackageEquipment)
    private equipmentRepo: Repository<VenuePackageEquipment>,

    @InjectRepository(VenuePackage)
    private packageRepo: Repository<VenuePackage>,

    @InjectRepository(Equipment)
    private equipmentEntityRepo: Repository<Equipment>,

    private readonly priceUpdater: PackagePriceUpdate
  ) {
    super(equipmentRepo);
  }

  async addEquipmentToPackage(dto: CreateVenuePackageEquipmentDto): Promise<VenuePackageEquipment> {
    const equipment = await this.equipmentEntityRepo.findOne({ where: { id: dto.equipment } });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    const venuePackageEquipment = this.equipmentRepo.create({
      package: { id: dto.package },
      equipment,
      price: dto.price,
      count: dto.count,
    });

    await this.equipmentRepo.save(venuePackageEquipment);
    await this.priceUpdater.updatePackagePrice(dto.package);

    return venuePackageEquipment;
  }

  async getPackageEquipment(packageId: number) {
    return this.equipmentRepo.find({ where: { package: { id: packageId } }, relations: ["equipment" , "equipment.iconMedia" ] });
  }

  async updateEquipmentInPackage(id: number, newPrice: number, newCount: number) {
    const venuePackageEquipment = await this.equipmentRepo.findOne({ where: { id }, relations: ['package'] });

    if (!venuePackageEquipment) {
      throw new NotFoundException('Equipment not found in package');
    }

    venuePackageEquipment.price = newPrice;
    venuePackageEquipment.count = newCount;
    await this.equipmentRepo.save(venuePackageEquipment);
    await this.priceUpdater.updatePackagePrice(venuePackageEquipment.package.id);

    return venuePackageEquipment;
  }

  async removeEquipmentFromPackage(id: number) {
    const venuePackageEquipment = await this.equipmentRepo.findOne({ where: { id }, relations: ['package'] });

    if (!venuePackageEquipment) {
      throw new NotFoundException('Equipment not found in package');
    }

    await this.equipmentRepo.remove(venuePackageEquipment);
    await this.priceUpdater.updatePackagePrice(venuePackageEquipment.package.id);

    return { message: 'Equipment removed from package successfully' };
  }
}