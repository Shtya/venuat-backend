import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { CreateFinanceDto, UpdateFinanceDto } from './dto';
import { Finance } from 'entities/finance.entity';
import { checkEntityExists } from 'utils/checkEntityExists';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Finance)
    private financeRepository: Repository<Finance>,
    private readonly i18n : I18nService
  ) {}

  async create(createFinanceDto: CreateFinanceDto): Promise<Finance> {
    const finance = this.financeRepository.create(createFinanceDto);
    return this.financeRepository.save(finance);
  }

  async findAll(page: any = 1, limit: any = 10, search?: string, sortBy?: string, sortOrder: 'ASC' | 'DESC' = 'ASC', bankName?: string, minBalance?: number) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new Error(this.i18n.t("events.validation.finance.invalid"));
    }
    const skip = (pageNumber - 1) * limitNumber;
    const query = this.financeRepository.createQueryBuilder('finance').skip(skip).take(limitNumber);
    if (search) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('LOWER(finance.bankName) LIKE LOWER(:search)', { search: `%${search}%` })
            .orWhere('LOWER(finance.accountNumber) LIKE LOWER(:search)', { search: `%${search}%` })
            .orWhere('LOWER(finance.iban) LIKE LOWER(:search)', { search: `%${search}%` })
            .orWhere('LOWER(finance.to) LIKE LOWER(:search)', { search: `%${search}%` });
        })
      );
    }
    if (sortBy) query.orderBy(`finance.${sortBy}`, sortOrder);
    const [data, total] = await query.getManyAndCount();

    return {total , limit , page , data };
  }

  async findOne(id: number): Promise<Finance> {
    return checkEntityExists(this.financeRepository , id , this.i18n.t("events.notFound"))
  }

  async update(id: number, updateFinanceDto: UpdateFinanceDto)  {
    await this.financeRepository.update(id, updateFinanceDto);
    return checkEntityExists(this.financeRepository , id , this.i18n.t("events.notFound") )
  }

  async remove(id: any) {
    await checkEntityExists(this.financeRepository, id, this.i18n.t("events.notFound"));
    await this.financeRepository.delete(id);

    return { message: this.i18n.t("events.validation.finance.deleted" , {args:{id}}) };
  }
}
