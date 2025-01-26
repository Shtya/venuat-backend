// src/property/property.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, BadRequestException, Query, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto, UpdatePropertyDto } from 'dto/property/property.dto';
import { City } from 'entity/property/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Property } from 'entity/property/property.entity';
import { User } from 'entity/user/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';

@Controller('properties')
export class PropertyController {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    private readonly propertyService: PropertyService
  ) {}


  @Get(':id/venues')
  async getVenuesForProperty(@Param('id') id: number) {
    const property = await this.propertyService.findOneWithVenues(id);
    return property ;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@Body() dto, @UploadedFile() fileName: any) {
    if (fileName) {
      dto.file = `${process.env.BASE_URL}/uploads/${fileName.filename}`;
    }

    const { name, description, file, city_id, vendor_id } = dto;
    await checkFieldExists(this.cityRepository, { id: dto.city_id }, `City with ID ${dto?.city_id} not found.`, true);
    await checkFieldExists(this.userRepository, { id: dto.vendor_id }, `Vendor with ID ${dto?.vendor_id} not found.`, true);

    return this.propertyService.create({ name, description, file, city: city_id, vendor: vendor_id });
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, name, description, city_id, vendor_id, venue_id } = query;
    return this.propertyService.findAll(
      'property',
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ['name', 'description'], // search
      { name, description, city_id, vendor_id, venue_id },
      [],
      ['vendor', 'city' , "venue"]
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id, ['city', 'vendor' , 'venue']);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: UpdatePropertyDto ) {
  //   const { name, description, file, city_id , vendor_id } = dto;
  //   return this.propertyService.update(+id, {name, description, file, vendor : vendor_id , city :city_id});
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(@Param('id') id: number, @Body() dto, @UploadedFile() fileName: any) {
    //
    const existingProperty = await this.propertyService.findOne(id);
    if (!existingProperty) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }

    if (fileName) {
      if (existingProperty.file) {
        const oldFilePath = path.join(process.cwd(), 'uploads', existingProperty.file.split('/uploads/')[1]);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      dto.file = `${process.env.BASE_URL}/uploads/${fileName.filename}`;
    }

    if (dto.city_id) 
      await checkFieldExists(this.cityRepository, { id: dto.city_id }, `City with ID ${dto.city_id} not found.`, true);
    
    if (dto.vendor_id) 
      await checkFieldExists(this.userRepository, { id: dto.vendor_id }, `Vendor with ID ${dto.vendor_id} not found.`, true);
    

    return this.propertyService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
