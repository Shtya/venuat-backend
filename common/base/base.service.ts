import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Brackets, QueryFailedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { checkEntityExists } from 'utils/checkEntityExists';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(dto: any , relations ?: string[]) {
    const metadata: any = this.repository.metadata;
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);

      if (!fieldExists) {
        throw new BadRequestException(`Field ${field} does not exist in the entity ${metadata.name}.`);
      }
    }

    try {
      const data = this.repository.create(dto);
      return this.repository.save(data);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes('duplicate key value violates unique constraint')) {
          throw new BadRequestException('A record with the same primary key already exists.');
        }
      }
      // Re-throw other errors
      throw new BadRequestException(error);
    }
  }

  async findAll(
    entityName: string,
    page: any = 1,
    limit: any = 10,
    search?: string,
    sortBy?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    searchFields: string[] = [], // Fields to search in
    filters?: { [key: string]: any }, // Additional filters
    fieldsShow?: string[],
    relations ?: string[]
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const skip = (pageNumber - 1) * limitNumber;

    //! check on the fields is exists in the entity collection
    const invalidFields = searchFields.filter(field => !this.repository.metadata.columns.some(col => col.propertyName === field));
    if (invalidFields.length > 0) throw new BadRequestException(`The following fields do not exist in the schema: ${invalidFields.join(', ')}`);

    const query = this.repository.createQueryBuilder(entityName).skip(skip).take(limitNumber);

    //! Add relations to the query
  if (relations && relations.length > 0) {
    relations.forEach(relation => {
      query.leftJoinAndSelect(`${entityName}.${relation}`, relation);
    });
  }

    if (search && searchFields.length > 0) {
      query.andWhere(
        new Brackets(qb => {
          searchFields.forEach(field => {
            const columnMetadata = this.repository.metadata.columns.find(col => col.propertyName === field);
            if (columnMetadata?.type === 'jsonb') {
              qb.orWhere(`LOWER(${entityName}.${field}->>:key) LIKE LOWER(:search)`, { key: 'en',  search: `%${search}%`, });
              qb.orWhere(`LOWER(${entityName}.${field}->>:key) LIKE LOWER(:search)`, { key: 'ar',  search: `%${search}%`, });
            } else if (columnMetadata?.type === String) {
              qb.orWhere(`LOWER(${entityName}.${field}) LIKE LOWER(:search)`, { search: `%${search}%` });
            } else if (['decimal', 'float'].includes(columnMetadata?.type as any)) {
              const numericSearch = parseFloat(search);
              if (!isNaN(numericSearch)) qb.orWhere(`${entityName}.${field} = :numericSearch`, { numericSearch });
            } else {
              qb.orWhere(`${entityName}.${field} = :search`, { search });
            }
          });
        })
      );
    }

    //! show fields
    if (fieldsShow?.length > 0) {
      const selectFields = fieldsShow.map(field => `${entityName}.${field}`);
      query.select(selectFields);
    }

    //! Apply additional filters (only for fields in searchFields)
    // if (filters) {
    //   Object.keys(filters).forEach(key => {
    //     if (filters[key] !== undefined && searchFields.includes(key)) {
    //       query.andWhere(`${entityName}.${key} = :${key}`, { [key]: filters[key] });
    //     }
    //   });
    // }

    // Apply sorting
    if (!['ASC', 'DESC'].includes(sortOrder)) throw new BadRequestException('order can accept only ASC or DESC values');
    if (sortBy) query.orderBy(`${entityName}.${sortBy}`, sortOrder);

    const [data, total] = await query.getManyAndCount();
    return { limit: limitNumber, countRecored: total, page: pageNumber, data };
  }

  async findOne(id: any , relations ?: string[]) {

    const entity = await this.repository.findOne({ where: { id } as any , relations : relations} );
      if (!entity) {
        throw new NotFoundException('This recored with ID not found.');
      }
      return entity
    // return checkEntityExists(this.repository, id, );
  }

  async update(id: any, dto: any) {
    const metadata: any = this.repository.metadata;
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);

      if (!fieldExists) {
        throw new BadRequestException(`Field ${field} does not exist in the entity ${metadata.name}.`);
      }
    }

    await this.repository.update(id, dto);
    return checkEntityExists(this.repository, id, 'This recored with ID not found.');
  }

  async remove(id: any) {
    await checkEntityExists(this.repository, id, 'This recored with ID not found.');
    await this.repository.delete(id);

    return { message: `recored with ID ${id} has been successfully deleted.` };
  }
}
