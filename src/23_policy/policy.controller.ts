import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
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
  create(@Body() dto: CreatePolicyDto ,  @Req() req: any ) {

    const user = req.user; 
    const isAdmin = user.role.name === 'admin'; 
    return this.policiesService.customCreate(dto ,  user.id, isAdmin);
  }


  @Post('/bulks')
  @UseGuards(AuthGuard)
  createBulk(@Body() dto: CreatePolicyDto[] | CreatePolicyDto, @Req() req: any) {
    const user = req.user;
    const isAdmin = user.role.name === 'admin';
    return this.policiesService.customCreateBult(dto, user.id, isAdmin);
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


    @Get('global-and-user')
    @UseGuards(AuthGuard)
    async findGlobalAndUserEquipment(@Query() query, @Req() req) {
        const userId = req.user.id;   
        return this.policiesService.findGlobalAndUserEquipment(userId);
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
