import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PoliciesService } from './policy.service';

import { Policy } from 'entity/venue/policy.entity';
import { CreatePolicyDto , UpdatePolicyDto } from 'dto/policy/policy.dto';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , name  } = query;
    return this.policiesService.findAll(
      "policy" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name" , 'description'], // search
      { },       // filer
      [ ] // show fileds
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Policy> {
    return this.policiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    return this.policiesService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number)  {
    return this.policiesService.remove(id);
  }
}
