import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, UseInterceptors, ValidationPipe, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { CreateVenueGalleryDto, UpdateVenueGalleryDto } from 'dto/venue/venue_gallery.dto';
import { VenueGalleryService } from './venue-gallery.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';
import { Media } from 'entity/media/media.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';
import { multerMultiplyOptions } from 'common/multer/multer_multiple';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { ImageUrlInterceptor } from 'src/image-url/image-url.interceptor';


@Controller('venue-gallery')
@UseInterceptors(ImageUrlInterceptor)
export class VenueGalleryController {
  constructor(
    @InjectRepository(Venue) readonly venueRepo: Repository<Venue>,
    @InjectRepository(Media) readonly mediaRepo: Repository<Media>,
    private readonly venueGalleryService: VenueGalleryService) {}


  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_GALLERY_CREATE)
  @UseInterceptors(FilesInterceptor('files', 10, multerMultiplyOptions)) // Accept up to 10 images
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadGallery( @UploadedFiles() files: Express.Multer.File[],  @Body() dto , @Req() req  ) {
  await checkFieldExists(this.venueRepo , {id : dto.venue_id} , this.venueGalleryService.i18n.t("events.venue_not_found")  , true , 404);
    
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imgPaths = files.map(file => `${baseUrl}/uploads/venues/${file.filename}`); // Get file paths
    dto.imgs = imgPaths; 
    return this.venueGalleryService.addGalleryImages(dto);
  }


  @Get(':venueId')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_GALLERY_READ)
  async getGallery(@Param('venueId') venueId: number) {
    return this.venueGalleryService.getGalleryByVenue(venueId);
  }


  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_GALLERY_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.venueGalleryService.FIND(
      'venue_gallery',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      [],                // Relations 
      ["venue_id" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_GALLERY_CREATE)
  @UseInterceptors(FilesInterceptor('files', 10, multerMultiplyOptions)) // Accept up to 10 images
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: number,  @UploadedFiles() files: Express.Multer.File[],  @Body() dto , @Req() req ) {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    
    await checkFieldExists(this.venueRepo, { id: dto.venue_id }, this.venueGalleryService.i18n.t("events.venue_not_found") , true, 404);
    const imgPaths = files.map(file => `${baseUrl}/uploads/venues/${file.filename}`); // Get file paths
    dto.imgs = imgPaths;     
    return this.venueGalleryService.updateGallery(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.VENUE_GALLERY_DELETE)
  async delete(@Param('id') id: number) {
    return this.venueGalleryService.remove(id);
  }


}
