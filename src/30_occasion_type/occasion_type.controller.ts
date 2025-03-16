import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OccasionTypeService } from './occasion_type.service';
import { CreateOccasionTypeDto, UpdateOccasionTypeDto } from 'dto/venue/occasion_type.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OccasionType } from 'entity/venue/occasion_type.entity';

@Controller('occasion-type')
export class OccasionTypeController {
  constructor(
    @InjectRepository(OccasionType)
    private readonly occasionTypeRepository: Repository<OccasionType>,
    private readonly occasionTypeService: OccasionTypeService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.OCCASION_TYPES_CREATE)
  async create(@Body() dto: CreateOccasionTypeDto) {
    return this.occasionTypeService.create(dto);
  }

  @Get()
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.occasionTypeService.FIND(
      'occasion_type',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get("/on-venues")
  async findAllOccasionOnVenues() {    
    return this.occasionTypeService.findAllOccasionOnVenues()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occasionTypeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.OCCASION_TYPES_UPDATE)
  update(@Param('id') id: string, @Body() updateOccasionTypeDto: UpdateOccasionTypeDto) {
    return this.occasionTypeService.update(+id, updateOccasionTypeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.OCCASION_TYPES_DELETE)
  remove(@Param('id') id: string) {
    return this.occasionTypeService.remove(+id);
  }
}
