import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OccasionTypeService } from './occasion_type.service';
import { CreateOccasionTypeDto ,UpdateOccasionTypeDto } from 'dto/venue/occasion_type.dto';

@Controller('occasion-type')
export class OccasionTypeController {
  constructor(private readonly occasionTypeService: OccasionTypeService) {}

  @Post()
  create(@Body() createOccasionTypeDto: CreateOccasionTypeDto) {
    return this.occasionTypeService.create(createOccasionTypeDto);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , name } = query;
    return this.occasionTypeService.findAll(
      "occasion_type" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name"], // search
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occasionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOccasionTypeDto: UpdateOccasionTypeDto) {
    return this.occasionTypeService.update(+id, updateOccasionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occasionTypeService.remove(+id);
  }
}
