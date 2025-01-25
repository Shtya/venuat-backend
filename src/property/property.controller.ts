// src/property/property.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, BadRequestException, Query, UseGuards, Req } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto , UpdatePropertyDto } from 'dto/property/property.dto';
import { City } from 'entity/property/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Property } from 'entity/property/property.entity';
import { User } from 'entity/user/user.entity';
import { User as UserInfo} from "decorators/user.decorator"
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'decorators/role.decorator';

@Controller('properties')
export class PropertyController {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    private readonly propertyService: PropertyService
  ) {}




  @Post()
  @UseGuards(AuthGuard)
  @Roles(["user" , "admin"])
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@Body() dto: CreatePropertyDto , @Req() req , @UserInfo() user , @UploadedFile() fileName: any) {
    // if (file) {
    //   dto.file = `${process.env.BASE_URL}/uploads/property/${file.filename}`;
    // }

    const { name, description, file, city_id } = dto;
    await checkFieldExists(this.cityRepository , {id : city_id} , `City with ID ${city_id} not found.` , true )

    return this.propertyService.create({name, description, file, vendor :req?.user.id, city :city_id});
  }


  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder ,name , description , city_id , vendor_id , venue_id  } = query;
    return this.propertyService.findAll(
      "property" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "name" ,"description" ], // search
      { name , description , city_id , vendor_id , venue_id }
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(+id , ["city" , "vendor" , "venue"] );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles(["user" , "admin"])
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto , @Req() req) {
    const { name, description, file, city_id } = dto;
    return this.propertyService.update(+id, {name, description, file, vendor :req?.user.id, city :city_id});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}