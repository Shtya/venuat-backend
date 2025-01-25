// src/utils/entity.utils.ts
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

export async function checkFieldExists(
  repository: { findOne: (options: any) => Promise<any> },
  query: Record<string, any>, // Use a key-value pair for the query
  message: string,
  negativeCondition ?: boolean
) {
  const entity = await repository.findOne({ where: query }); // Pass query directly

  if(negativeCondition){
    if (!entity)  throw new NotFoundException(message); 
  }
  else {
    if (entity)  throw new NotFoundException(message); 
  }

}