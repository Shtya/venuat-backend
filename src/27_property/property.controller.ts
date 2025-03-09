// src/property/property.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, BadRequestException, Query, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'dto/property/property.dto';
import { City } from 'entity/property/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';
import { User } from 'entity/user/user.entity'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { I18nService } from 'nestjs-i18n';

@Controller('properties')
export class PropertyController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly propertyService: PropertyService,
    private readonly i18n: I18nService
  ) {}

  @Get(':id/venues')
  async getVenuesForProperty(@Param('id') id: number) {
    const property = await this.propertyService.findOneWithVenues(id);
    return property;
  }



  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@Body() dto, @UploadedFile() fileName: any , @Req() req) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;

    const { name, description, file, city_id, vendor_id } = dto;
    const user : any = await this.userRepository.findOne({where : {id : vendor_id } , relations : ["role"] });
    

    let uploadImg= `${baseUrl}/uploads/${fileName.filename}`
    // if (fileName) 
    //   await uploadImg = ;

    
    
    await checkFieldExists(this.userRepository, { id: dto.vendor_id },  this.i18n.t("events.vendor_not_found" , {args : {vendor_id}} )  , true);  
    if(user?.role?.name  !== "vendor" ) throw new BadRequestException( this.i18n.t("events.only_vendors_can_create")  );  
    await checkFieldExists(this.cityRepository, { id: dto.city_id },  this.i18n.t("events.city_not_found" , {args : {city_id}})  , true);  

    return this.propertyService.create({ name , description, file : uploadImg , city: city_id, vendor: vendor_id });
  }


  
  @Put(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PROPERTIES_UPDATE)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(@Param('id') id: number, @Body() dto, @UploadedFile() fileName: any , @Req() req) {

        const baseUrl = `${req.protocol}://${req.get("host")}`;

    const existingProperty = await this.propertyService.findOne(id);
    const user : any = await this.userRepository.findOne({where : {id : dto.vendor_id } , relations : ["role"] });

    if (!existingProperty) 
      throw new NotFoundException( this.i18n.t("events.property_not_found" , {args : {id}})  );  
    
    if (fileName) 
      dto.file = `${baseUrl}/uploads/${fileName.filename}`;
    

    if (dto.vendor_id) await checkFieldExists(this.userRepository, { id: dto.vendor_id },  this.i18n.t("events.vendor_not_found" , {args: {vendor_id : dto.vendor_id}} )  , true);  
    if(user?.role?.name  !== "vendor" ) throw new BadRequestException( this.i18n.t("events.only_vendors_can_create")  );  

    if (dto.city_id) await checkFieldExists(this.cityRepository, { id: dto.city_id },  this.i18n.t("events.city_not_found" , {args: {city_id : dto.city_id}} )  , true);  

    const { name , description , file , city_id:city , vendor_id:vendor  } = dto;

    return this.propertyService.update(id,   {name , description , file , city , vendor  }    );
  }
  
  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PROPERTIES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.propertyService.FIND(
      'property',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ['vendor', 'city', 'venue'],                // Relations 
      [ "name" , 'description' , "created_at" ],         // search parameters
      restQueryParams    // search with fields
    );
  }



  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PROPERTIES_READ)
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id, ['city', 'vendor', 'venue']);
  }



  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.PROPERTIES_DELETE)
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
