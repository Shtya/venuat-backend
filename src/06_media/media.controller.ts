import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto, UpdateMediaDto, UploadQueryDto } from 'dto/media/media.dto';
import { multerConfig } from 'common/multer/multer2.config';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.MEDIA_CREATE)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@Query() query: UploadQueryDto, @UploadedFile() file: Express.Multer.File, @Body() createMediaDto: CreateMediaDto , @Req() req) {
    return this.mediaService.createCustom(createMediaDto, file, query , req);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.MEDIA_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.mediaService.FIND(
      'media',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ["name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.MEDIA_READ)
  async findOne(@Param('id') id: number) {
    return this.mediaService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.MEDIA_UPDATE)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateMedia(@Param('id') id: number, @Body() dto: any, @Query() query: UploadQueryDto, @UploadedFile() file: Express.Multer.File , @Req() req) {
    return this.mediaService.updateCustom(id, dto, file, query , req);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.MEDIA_DELETE)
  async deleteMedia(@Param('id') id: number, @Query('fileName') fileName: string) {
    return this.mediaService.updateDelete(id, fileName);
  }
}
