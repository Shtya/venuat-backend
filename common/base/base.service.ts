import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Brackets, QueryFailedError } from 'typeorm';
import { checkEntityExists } from 'utils/checkEntityExists';
import { I18nService } from 'nestjs-i18n';

export interface FindAllOptions {
  entityName: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  searchFields?: string[];
  relations?: string[];
  fieldsExclude?: string[];
  filters?: Record<string, any>; // Additional filters like { price: 12 }
}

@Injectable()
export class BaseService<T> {
  @Inject(I18nService)
  public readonly i18n: I18nService;

  constructor(protected readonly repository: Repository<T>) {}

  async update(id: any, dto: any) {
    const metadata: any = this.repository.metadata;
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);

      if (!fieldExists) {
        throw new BadRequestException(this.i18n.t('events.field_not_found', { args: { field } }));
      }
    }

    await this.repository.update(id, dto);
    return checkEntityExists(this.repository, id, this.i18n.t('events.record.not_found'));
  }

  async create(dto: any, relations?: string[]) {
    const metadata: any = this.repository.metadata;
    for (const field of Object.keys(dto)) {
      const fieldExists = metadata.columns.some(column => column.propertyName === field);

      if (!fieldExists) {
        throw new BadRequestException(this.i18n.t('events.field_not_found', { args: { field } }));
      }
    }

    try {
      const data = this.repository.create(dto);
      return this.repository.save(data);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes(this.i18n.t('events.duplicate_key'))) {
          throw new BadRequestException(this.i18n.t('events.record_exists'));
        }
      }
      // Re-throw other errors
      throw new BadRequestException(error);
    }
  }

  async FIND(entityName: string, search?: string, page: any = 1, limit: any = 10, sortBy?: string, sortOrder: 'ASC' | 'DESC' = 'DESC', fieldsExclude?: string[], relations?: string[], searchFields?: string[], specificSearchFields?: any , customRelations ?: boolean ,status ?: string ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException(this.i18n.t('events.invalid_pagination'));
    }

    if (!['ASC', 'DESC'].includes(sortOrder)) {
      throw new BadRequestException(this.i18n.t('events.invalid_sort_order'));
    }

    const skip = (pageNumber - 1) * limitNumber;
    const query = this.repository.createQueryBuilder(entityName).skip(skip).take(limitNumber);

    if (specificSearchFields) {
      const specificSearchFieldstemp: { [key: string]: string } = {};

      // Process specific search fields
      Object.entries(specificSearchFields).forEach(([key, value]) => {
        if (key.startsWith('field:')) {
          const field = key.split(':')[1]; // Extract the field name after 'field:'
          if (field) {
            specificSearchFieldstemp[field] = value as string; // Store the field name and value in the temp object
          }
        }
      });

      const existingFields = this.repository.metadata.columns.map(col => col.propertyName);

      // Check for non-existent fields
      const nonExistentFields = Object.keys(specificSearchFieldstemp).filter(field => !existingFields.includes(field));

      Object.keys(specificSearchFieldstemp).forEach(e => {
        if (relations.includes(e)) throw new ConflictException(this.i18n.t('events.non_existent_fields', { args: { fields: nonExistentFields.join(', ') } }));
      });

      if (nonExistentFields.length > 0) {
        throw new ConflictException(this.i18n.t('events.non_existent_relation_fields', { args: { fields: nonExistentFields.join(', ') } }));
      }

      // Apply search conditions
      if (Object.keys(specificSearchFieldstemp).length > 0) {
        query.andWhere(
          new Brackets(qb => {
            Object.entries(specificSearchFieldstemp).forEach(([field, searchValue]) => {
              const columnMetadata = this.repository.metadata.columns.find(col => col.propertyName === field);

              if (columnMetadata) {
                if (columnMetadata.type === 'jsonb') {
                  qb.orWhere(`LOWER(${entityName}.${field}::text) LIKE LOWER(:searchValue)`, { searchValue: `%${searchValue}%` });
                } else if (columnMetadata.type === String) {
                  qb.orWhere(`LOWER(${entityName}.${field}) LIKE LOWER(:value)`, { value: `%${searchValue}%` });
                } else if (['decimal', 'float'].includes(columnMetadata.type as string)) {
                  // Apply search for numeric fields (exact match)
                  const numericSearch = parseFloat(searchValue);
                  if (!isNaN(numericSearch)) {
                    qb.orWhere(`${entityName}.${field} = :numericSearch`, { numericSearch });
                  }
                } 
                
                else if (columnMetadata.type === 'timestamp') {
                  let normalizedSearchValue = searchValue;

                  if (/^\d{4}-\d{2}$/.test(searchValue)) {
                    normalizedSearchValue = `${searchValue}-01`; 
                    qb.orWhere(`${entityName}.${field} = CAST(:normalizedSearchValue AS timestamp)`, { normalizedSearchValue });
                  }
                } 
                
                else {
                  qb.orWhere(`${entityName}.${field} = :value`, { value: searchValue });
                }
              }
            });

            status && qb.andWhere(`${entityName}.status = :status`, { status: status });

          })
        );
      }
    }

    //! Apply search
    if (search && searchFields?.length >= 1) {
      query.andWhere(
        new Brackets(qb => {
          searchFields.forEach(field => {
            const columnMetadata = this.repository.metadata.columns.find(col => col.propertyName === field);

            if (columnMetadata?.type === 'jsonb') {
              qb.orWhere(`LOWER(${entityName}.${field}::text) LIKE LOWER(:search)`, { search: `%${search}%` });
            } else if (columnMetadata?.type === String || columnMetadata?.type == 'text') {
              qb.orWhere(`LOWER(${entityName}.${field}) LIKE LOWER(:search)`, { search: `%${search}%` });
            } else if (['decimal', 'float'].includes(columnMetadata?.type as any)) {
              const numericSearch = parseFloat(search);
              if (!isNaN(numericSearch)) qb.orWhere(`${entityName}.${field} = :numericSearch`, { numericSearch });
            } else if (columnMetadata?.type === 'enum') {
              const enumValues = columnMetadata.enum;
              if (enumValues.includes(search)) {
                qb.orWhere(`${entityName}.${field} = :value`, { value: search });
              } else {
                throw new BadRequestException(this.i18n.t('events.invalid_enum_value', { args: { field, values: enumValues.join(', ') } }));
              }
            } else {
              qb.orWhere(`${entityName}.${field} = :search`, { search });
            }
          });
        })
      );
    }

    //! Validate and apply relations
    if (relations?.length > 0) {
      const invalidRelations = relations.filter(relation => !this.repository.metadata.relations.some(rel => rel.propertyName === relation));
      if (invalidRelations.length > 0) {
        throw new BadRequestException(this.i18n.t('events.invalid_relations', { args: { relations: invalidRelations.join(', ') } }));
      }
      relations.forEach(relation => {
        query.leftJoinAndSelect(`${entityName}.${relation}`, relation);
      });

    }



    //! Apply sorting
      const defaultSortBy = "created_at";
      const sortField = sortBy || defaultSortBy; 
      const sortDirection = sortOrder || "DESC"; 

      const columnExists = this.repository.metadata.columns.some(col => col.propertyName === sortField);
      if (!columnExists) {
        throw new BadRequestException(this.i18n.t('events.invalid_sort_by', { args: { sortBy: sortField } }));
      }

      query.orderBy(`${entityName}.${sortField}`, sortDirection);


    //! Fetch data
    const [data, total] = await query.getManyAndCount() as any;

    //! Exclude specified fields from the response
    if (fieldsExclude?.length > 0) {
      const invalidExcludeFields = fieldsExclude.filter(field => !this.repository.metadata.columns.some(col => col.propertyName === field));
      if (invalidExcludeFields.length > 0) {
        throw new BadRequestException(this.i18n.t('events.invalid_exclude_fields', { args: { fields: invalidExcludeFields.join(', ') } }));
      }

      data.forEach(item => {
        fieldsExclude.forEach(field => delete item[field]);
      });
    }


    return { limit: limitNumber, countRecored: total, page: pageNumber, data  };
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
    relations?: string[]
  ) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException(this.i18n.t('events.invalid_pagination'));
    }

    const skip = (pageNumber - 1) * limitNumber;

    //! check on the fields is exists in the entity collection
    const invalidFields = searchFields.filter(field => !this.repository.metadata.columns.some(col => col.propertyName === field));
    if (invalidFields.length > 0) throw new BadRequestException(`The following fields do not exist in the schema: ${invalidFields.join(', ')}`);

    const query = this.repository.createQueryBuilder(entityName).skip(skip).take(limitNumber);

    //! show fields
    if (fieldsShow?.length > 0) {
      const selectFields = fieldsShow.map(field => `${entityName}.${field}`);
      query.select(selectFields);
    }

    // Apply sorting
    if (!['ASC', 'DESC'].includes(sortOrder)) throw new BadRequestException('order can accept only ASC or DESC values');
    if (sortBy) query.orderBy(`${entityName}.${sortBy || "created_at"}`, sortOrder || "DESC");

    const [data, total] = await query.getManyAndCount();
    return { limit: limitNumber, countRecored: total, page: pageNumber, data };
  }

  async findOne(id: any, relations?: string[]) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: relations });
    if (!entity) {
      throw new NotFoundException(this.i18n.t('events.record_not_found', { args: { id } }));
      // return 
    }
    return entity;
  }

  async remove(id: any) {
    await checkEntityExists(this.repository, id, this.i18n.t('events.record_not_found', { args: { id } }));
    await this.repository.delete(id);

    return { message: this.i18n.t('events.record_deleted', { args: { id } }) };
  }
}
