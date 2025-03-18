// src/service/service.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
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
    @InjectRepository(Media)  private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    private readonly serviceService: ServiceService
  ) {}



  @Post()
  @UseGuards(AuthGuard)
  // @Permissions(EPermissions.SERVICES_CREATE)
  async create(@Body() dto: CreateServiceDto, @Req() req: any) {
    await checkFieldExists(this.mediaRepository, { id: dto.icon_media_id }, this.serviceService.i18n.t("events.media.not_found", { args: { id: dto.icon_media_id } })    , true , 404);
    
    const user = req.user; 
    const isAdmin = user.role.name === 'admin'; 
  
    return this.serviceService.customCreate(dto, user.id, isAdmin);
  }


  



  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.SERVICES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    restQueryParams["field:is_predefined"] = true;

    // return this.serviceRepository.find( {   where: {is_predefined : true} , relations : ["iconMedia"] , })
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


  
    @Get('global-and-user')
    @UseGuards(AuthGuard)
    @Permissions(EPermissions.EQUIPMENT_READ)
    async findGlobalAndUserEquipment(@Query() query, @Req() req) {
        const userId = req.user.id; 
        return this.serviceRepository.find( {   where: [{ user_id: userId } , {is_predefined : true} ], relations : ["iconMedia"] , })
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
