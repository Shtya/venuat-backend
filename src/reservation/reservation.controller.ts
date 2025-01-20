import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto , UpdateReservationDto } from './dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Create a new reservation
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  // Get all reservations
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string, @Query('search') search?: string, @Query('sortBy') sortBy?: string, @Query('sortOrder') sortOrder?: 'ASC' | 'DESC') {
      return this.reservationService.findAll(page, limit, search, sortBy, sortOrder );
    }

  // Get a reservation by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reservationService.findOne(id);
  }

  // Update a reservation
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  // Delete a reservation
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.reservationService.remove(id);
  }
}