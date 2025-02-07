import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { VenuePackageService } from './venue-package.service';
import { CreateVenuePackageDto, UpdateVenuePackageDto } from 'dto/venue/venue_package.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/1_auth/auth.guard';
import { Permissions } from 'src/1_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('venue-packages')
export class VenuePackageController {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepo: Repository<Venue>,  
    private readonly venuePackageService: VenuePackageService) {}


  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_CREATE)
  async create(@Body() dto: CreateVenuePackageDto) {
    await checkFieldExists( this.venueRepo , {id : dto.venue_id} , "venue doesn't exist." , true , 404  )
    const venue = await this.venueRepo.findOne({where : {id : dto.venue_id}})

    dto.package_price = venue?.price || 0
    return this.venuePackageService.create(dto);
  }



  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.venuePackageService.FIND(
      'venue_packages',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ["services" , "equipments"],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_READ)
  findOne(@Param('id') id: number) {
    return this.venuePackageService.findOne(id , ["services"  , "equipments"  ]);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_UPDATE)
  update(@Param('id') id: number, @Body() dto: UpdateVenuePackageDto) {
    return this.venuePackageService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_PACKAGE_DELETE)
  delete(@Param('id') id: number) {
    return this.venuePackageService.remove(id);
  }
}
