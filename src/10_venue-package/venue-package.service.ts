import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { BaseService } from 'common/base/base.service';
import { Equipment } from 'entity/venue/equipment.entity';
import { Service } from 'entity/venue/service.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Venue } from 'entity/venue/venue.entity';
import { CreateVenuePackageDto } from 'dto/venue/venue_package.dto';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackageService as VenuePackageServiceDif } from 'entity/venue/venue_package_service.entity';

@Injectable()
export class VenuePackageService extends BaseService<VenuePackage> {
  constructor(
    @InjectRepository(Venue)  private readonly venueRepo: Repository<Venue>,  
    @InjectRepository(Equipment) private equipmentRepo: Repository<Equipment>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(VenuePackage) private venuePackageRepo: Repository<VenuePackage>,

    @InjectRepository(VenuePackageEquipment) private readonly venuePackageEquipmentRepo: Repository<VenuePackageEquipment>,

    @InjectRepository(VenuePackageServiceDif) private readonly venuePackageServiceRepo: Repository<VenuePackageServiceDif>,
  ) {
    super(venuePackageRepo);
  }




  

  async customCreate(dto: CreateVenuePackageDto, req) {
    await checkFieldExists(this.venueRepo, { id: dto.venue_id }, "venue doesn't exist.", true, 404);
    const venue = await this.venueRepo.findOne({ where: { id: dto.venue_id } });

    dto.package_price = dto.venue_price || venue?.price || 0;

    // التحقق من أن تاريخ البداية قبل تاريخ النهاية
    if (new Date(dto.start_date) >= new Date(dto.end_date)) {
        throw new BadRequestException("Start date must be before end date.");
    }

    // التحقق من عدم وجود باقة بتاريخ انتهاء إذا كانت الباقة عرضًا
    if (dto.start_date && new Date(dto.start_date) <= new Date()) {
      throw new BadRequestException("The offer end date must be in the future.");
  }

    // جلب المعدات والخدمات المتاحة للمستخدم
    const predefinedEquipments = await this.getPredefinedEquipments(req.user.id);
    const predefinedServices = await this.getPredefinedServices(req.user.id);

    // إنشاء الباقة
    const venuePackage = this.venuePackageRepo.create(dto);
    await this.venuePackageRepo.save(venuePackage);

    // إنشاء `VenuePackageEquipment` لكل معدات مسترجعة
    const venuePackageEquipments = predefinedEquipments.map(equipment => ({
        package: venuePackage,
        equipment: equipment,
        count: 0,
        price: 0,
    }));
    await this.venuePackageEquipmentRepo.save(venuePackageEquipments);

    // إنشاء `VenuePackageService` لكل خدمة مسترجعة
    const venuePackageServices = predefinedServices.map(service => ({
        package: venuePackage,
        service: service,
        price: 0,
        count : 0
    }));
    await this.venuePackageServiceRepo.save(venuePackageServices);

    return venuePackage;
}



  async getForVenue(venue_id){
    const venuePackages = await this.venuePackageRepo.find({
          where: { venue_id },
          relations: ['services.service' , 'services.service.iconMedia', 'equipments.equipment' ,  'equipments.equipment.iconMedia'], // تضمين العلاقات
          order: { created_at: 'DESC' }, // ترتيب الباقات من الأحدث إلى الأقدم
        });
    
        // if (!venuePackages.length) {
        //   throw new NotFoundException(`No packages found for venue ID ${venue_id}`);
        // }
    
        return venuePackages;
  }



  async getPredefinedEquipments(userId: number) {
    return this.equipmentRepo.find({
      where: [
        {is_predefined: true} ,
        {user_id: userId } 
      ]
    });
  }
  
  async getPredefinedServices(userId: number) {
    return this.serviceRepo.find({
      where: [
        {is_predefined: true} ,
        {user_id: userId } 
      ]
    });
  }
  

}
