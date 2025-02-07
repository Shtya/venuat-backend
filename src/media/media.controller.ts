import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto, UpdateMediaDto, UploadQueryDto } from 'dto/media/media.dto';
import { multerConfig } from 'common/multer/multer2.config';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@Query() query: UploadQueryDto, @UploadedFile() file: Express.Multer.File, @Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createCustom(createMediaDto, file, query);
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder } = query;
    return this.mediaService.findAll('media', page, limit, search, sortBy, sortOrder, ['name']);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.mediaService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateMedia(@Param('id') id: number, @Body() dto: any, @Query() query: UploadQueryDto, @UploadedFile() file: Express.Multer.File) {
    return this.mediaService.updateCustom(id, dto, file, query);
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: number, @Query('fileName') fileName: string) {
    return this.mediaService.updateDelete(id, fileName);
  }
}
