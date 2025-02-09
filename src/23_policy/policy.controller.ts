import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { PoliciesService } from './policy.service';

import { Policy } from 'entity/venue/policy.entity';
import { CreatePolicyDto, UpdatePolicyDto } from 'dto/policy/policy.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { EPermissions } from 'enums/Permissions.enum';
import { Permissions } from 'src/01_auth/permissions.decorators';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_CREATE)
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.policiesService.FIND(
      'policy',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ['name', 'description'],         // search parameters
      restQueryParams    // search with fields
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_READ)
  findOne(@Param('id') id: number): Promise<Policy> {
    return this.policiesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_UPDATE)
  update(@Param('id') id: number, @Body() updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    return this.policiesService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_POLICY_DELETE)
  remove(@Param('id') id: number) {
    return this.policiesService.remove(id);
  }
}
