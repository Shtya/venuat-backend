// src/equipment/equipment.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from 'dto/venue/equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , name  } = query;
    return this.equipmentService.findAll(
      "equipment" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name" ], // search
      {  },       // filer
      [ ] , // show fileds
      ["iconMedia"]
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id , ["iconMedia"]);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.equipmentService.remove(+id);
  }
}