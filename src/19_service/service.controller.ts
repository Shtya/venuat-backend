// src/service/service.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from 'dto/venue/service.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'entity/venue/service.entity';
import { Repository } from 'typeorm';
import { Media } from 'entity/media/media.entity';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('services')
export class ServiceController {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly serviceService: ServiceService
  ) {}



  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_CREATE)
  async create(@Body() dto: CreateServiceDto) {
    await checkFieldExists(this.mediaRepository, { id: dto.icon_media_id }, this.serviceService.i18n.t("events.media.not_found", { args: { id: dto.icon_media_id } })    , true);
    return this.serviceService.create(dto);
  }




  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.serviceService.FIND(
      'service',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ['iconMedia'],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_READ)
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id, ['iconMedia']);
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    await checkFieldExists(this.mediaRepository, { id: dto.icon_media_id }, this.serviceService.i18n.t("events.media.not_found", { args: { id: dto.icon_media_id } })    , true , 404);
    return this.serviceService.update(+id, dto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_READ)
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
