import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateReservationDto } from 'dto/venue/reservation.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
  constructor(
    @InjectRepository(Reservation)  private reservationRepo: Repository<Reservation>,
    @InjectRepository(User)  private userRepo: Repository<User>,
    @InjectRepository(Venue)  private venueRepo: Repository<Venue>,
    @InjectRepository(VenuePackage)  private packageRepo: Repository<VenuePackage>,
  ) {
    super(reservationRepo);
  }

  async createCustom(dto)  {
    
    await checkFieldExists( this.userRepo , {id : dto.user} , this.i18n.t("events.user_not_exist") , true , 404  ) 
    await checkFieldExists( this.venueRepo , {id : dto.venue} , this.i18n.t("events.venue_not_exist") , true , 404  ) 
    dto.package && await checkFieldExists( this.packageRepo , {id : dto.package} , this.i18n.t("events.package_not_exist") , true , 404  ) 

    const overlappingReservation = await this.reservationRepo
      .createQueryBuilder('reservation')
      .where('reservation.venueId = :venueId', { venueId: dto.venue })
      .andWhere('reservation.check_in = :checkIn', { checkIn: dto.check_in })
      .andWhere('reservation.from_time < :toTime', { toTime: dto.to_time })
      .andWhere('reservation.to_time > :fromTime', { fromTime: dto.from_time })
      .getOne();

    if (overlappingReservation) {
      throw new BadRequestException(
        this.i18n.t("events.venue_already_reserved", { args: { from_time: overlappingReservation.from_time, to_time: overlappingReservation.to_time, check_in: dto.check_in } }), 
      );
    }

    const reservation = this.reservationRepo.create(dto);
    return this.reservationRepo.save(reservation);
  }


  // async findUserReservations(id) {
  //   const reservations = await this.reservationRepo
  //     .createQueryBuilder('reservation')
  //     .leftJoinAndSelect('reservation.user', 'user')
  //     .leftJoinAndSelect('reservation.venue', 'venue')
  //     .leftJoinAndSelect('reservation.package', 'package')
  //     .where('user.id = :userId', { userId : id })
  //     .getMany();
  
  //   return reservations;
  // }

  async findUserReservations(id) {
    const reservations = await this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.package', 'package')

      .leftJoinAndSelect('package.services', 'services')
      .leftJoinAndSelect('services.service', 'service')
      .leftJoinAndSelect('package.equipments', 'equipments')
      .leftJoinAndSelect('equipments.equipment', 'equipment')

      .leftJoinAndSelect('reservation.venue', 'venue')

      .leftJoinAndSelect('venue.venueServices', 'venueServices')
      .leftJoinAndSelect('venueServices.service', 'venueService')

      .leftJoinAndSelect('venue.venueEquipments', 'venueEquipments')
      .leftJoinAndSelect('venueEquipments.equipment', 'venueEquipment')


      .where('user.id = :userId', { userId: id })
      .getMany();
  
    return reservations;
  }
  
  
  

}
