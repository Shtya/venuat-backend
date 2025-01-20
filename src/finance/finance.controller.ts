import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto, UpdateFinanceDto } from './dto';
import { Finance } from 'entities/finance.entity';
import { Roles } from 'decorators/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('finances')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async create(@Body() createFinanceDto: CreateFinanceDto): Promise<Finance> {
    return this.financeService.create(createFinanceDto);
  }
  
  @Get()
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async findAll(@Query('page') page: string, @Query('limit') limit: string, @Query('search') search?: string, @Query('sortBy') sortBy?: string, @Query('sortOrder') sortOrder?: 'ASC' | 'DESC', @Query('bankName') bankName?: string, @Query('minBalance') minBalance?: string) {
    return this.financeService.findAll(page, limit, search, sortBy, sortOrder, bankName, Number(minBalance));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async findOne(@Param('id') id: number): Promise<Finance> {
    return this.financeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async update(@Param('id') id: number, @Body() updateFinanceDto: UpdateFinanceDto): Promise<Finance> {
    return this.financeService.update(id, updateFinanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async remove(@Param('id') id: number) {
    return this.financeService.remove(id);
  }
}
