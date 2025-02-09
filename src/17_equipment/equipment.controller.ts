// src/equipment/equipment.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from 'dto/venue/equipment.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'entity/media/media.entity';
import { Repository } from 'typeorm';

@Controller('equipment')
export class EquipmentController {
  constructor(
    @InjectRepository(Media) readonly mediaRepo: Repository<Media>,
    private readonly equipmentService: EquipmentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.EQUIPMENT_CREATE)
  async create(@Body() dto: CreateEquipmentDto) {
    await checkFieldExists(this.mediaRepo, { id: dto.icon_media_id }, this.equipmentService.i18n.t("events.media.not_found", { args: { id: dto.icon_media_id } })    , true , 404);
    return this.equipmentService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.EQUIPMENT_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.equipmentService.FIND(
      'equipment',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ["iconMedia"],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.EQUIPMENT_READ)
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id, ['iconMedia']);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.EQUIPMENT_UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
    await checkFieldExists(this.mediaRepo, { id: dto.icon_media_id }, this.equipmentService.i18n.t("events.media.not_found", { args: { id: dto.icon_media_id } })    , true , 404);
    return this.equipmentService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.EQUIPMENT_DELETE)
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
