import { Controller, Post, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ContactUsService } from './contact-us.service'; 
import { CreateContactUsDto, UpdateContactUsDto } from 'dto/user/contact-us.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  // @UseGuards(AuthGuard)
  create(@Body() dto: CreateContactUsDto) {
    return this.contactUsService.create(dto);
  }

   @Get()
   @UseGuards(AuthGuard)
   async findAll(@Query() query  ) {
     const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
     
     return this.contactUsService.FIND(
       'contact_us',
       search ,
       page,
       limit,
       sortBy,
       sortOrder,
       [],                // exclude some fields
       [],                // Relations 
       ["name" , "email" ],         // search parameters
       restQueryParams    // search with fields
     );
   }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contactUsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateContactUsDto) {
    return this.contactUsService.update(+id, dto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contactUsService.remove(+id);
  }
}
