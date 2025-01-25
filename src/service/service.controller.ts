// src/service/service.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from 'dto/venue/service.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'entity/venue/service.entity';
import { Repository } from 'typeorm';
import { Media } from 'entity/media/media.entity';


@Controller('services')
export class ServiceController {
  constructor(
    // @InjectRepository(Service)
    // private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    await checkFieldExists(this.mediaRepository , {id : dto.icon_media_id } , `Media with ID ${dto.icon_media_id} does not exist.` , true )
    return this.serviceService.create(dto);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , name  } = query;
    return this.serviceService.findAll(
      "service" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name"], // search
      {},
      [],
      ["iconMedia"]
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id , ['iconMedia']);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)  {
    return this.serviceService.remove(+id);
  }
}