import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CreateVendorDto, UpdateVendorDto, FilterVendorDto } from './dto/vendor.dto';
import { VendorService } from './vendors.service';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  async findAll(@Query() filterVendorDto: FilterVendorDto) {
    return this.vendorService.findAll(filterVendorDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vendorService.delete(id);
  }
}
