import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'entities/reservation.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { checkEntityExists } from 'utils/checkEntityExists';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly i18n: I18nService
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const existingReservation = await this.reservationRepository.findOne({ where: { date: createReservationDto.date } });

    if (existingReservation) throw new ConflictException(`A reservation already exists for the date: ${createReservationDto.date}`);

    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async findAll(page: any = 1, limit: any = 10, search?: string, sortBy?: string, sortOrder: 'ASC' | 'DESC' = 'ASC') {
    // Validate page and limit
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new Error('Invalid pagination parameters');
    }

    // Calculate skip for pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Create a query builder
    const query = this.reservationRepository.createQueryBuilder('reservations').skip(skip).take(limitNumber);

    // Add search conditions
    if (search) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('LOWER(reservations.venueName) LIKE LOWER(:search)', {
            search: `%${search}%`,
          })
            .orWhere('LOWER(reservations.userName) LIKE LOWER(:search)', {
              search: `%${search}%`,
            })
            .orWhere('CAST(reservations.amount AS TEXT) LIKE :search', {
              search: `%${search}%`,
            });
        })
      );
    }

    // Add sorting
    if (sortBy) {
      query.orderBy(`reservations.${sortBy}`, sortOrder);
    }

    // Execute the query
    const [data, total] = await query.getManyAndCount();

    // Return the result
    return {
      total,
      limit: limitNumber,
      page: pageNumber,
      data,
    };
  }
  async findOne(id: number) {
    return checkEntityExists(this.reservationRepository, id, this.i18n.t('events.notFound'));
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    await this.reservationRepository.update(id, updateReservationDto);
    return checkEntityExists(this.reservationRepository, id, this.i18n.t('events.notFound'));
  }

  async remove(id: any) {
    await checkEntityExists(this.reservationRepository, id, this.i18n.t('events.notFound'));
    await this.reservationRepository.delete(id);

    return { message: this.i18n.t('events.validation.finance.deleted', { args: { id } }) };
  }
}
