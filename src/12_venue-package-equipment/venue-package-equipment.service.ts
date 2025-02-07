import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { PackagePriceUpdate } from 'common/package-price-updater.service'; // Service for recalculating price
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

    private readonly priceUpdater: PackagePriceUpdate // Inject price updater service
  ) {
    super(equipmentRepo);
  }

  async addEquipmentToPackage(dto: CreateVenuePackageEquipmentDto): Promise<VenuePackageEquipment> {
    const equipment = await this.equipmentEntityRepo.findOne({ where: { id: dto.equipment } });

    if (!equipment) {
      throw new Error(this.i18n.t("events.equipment_not_found2")); //! 'Equipment not found'
    }

    const venuePackageEquipment = this.equipmentRepo.create({
      package: { id: dto.package },
      equipment,
      price: dto.price,
      count: dto.count,
    });

    await this.equipmentRepo.save(venuePackageEquipment);

    // 🔄 Recalculate and update package price
    await this.priceUpdater.updatePackagePrice(dto.package);

    return venuePackageEquipment;
  }

  async getPackageEquipment(packageId: number) {
    return this.equipmentRepo.find({ where: { package: { id: packageId } }, relations: ['package'] });
  }

  async deleteEquipmentAndUpdatePrice(equipmentId: number): Promise<void> {
    const equipment = await this.equipmentRepo.findOne({ where: { id: equipmentId }, relations: ['package'] });

    if (!equipment) {
      throw new NotFoundException(this.i18n.t("events.equipment_not_found2")); //! 'Equipment not found'
    }

    const packageId = equipment.package.id;

    await this.equipmentRepo.delete(equipmentId);

    await this.priceUpdater.updatePackagePrice(packageId);
  }
}
