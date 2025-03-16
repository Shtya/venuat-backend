import { Controller, Post, Get, Body, Param, Delete, Query, UseGuards } from '@nestjs/common'; 
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from 'dto/venue/reservation.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('reservations')
export class ReservationController   {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_CREATE)
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.createCustom(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.reservationService.FIND(
      'reservations',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ["user" , "venue" , "package"],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  findOne(@Param('id') id: number) {
    return this.reservationService.findOne(id , ["user" , "venue" , "package"]);
  }


  @Get(':id/user')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  findOneVenue(@Param('id') id: number) {
    return this.reservationService.findUserReservations(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_DELETE)
  delete(@Param('id') id: number) {
    return this.reservationService.remove(id);
  }
}
