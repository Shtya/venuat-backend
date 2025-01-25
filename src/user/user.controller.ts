import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, UseInterceptors, UploadedFile, UnauthorizedException, Req, UsePipes, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';
import { UpdateUserDto } from 'dto/user.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
// import { CreateDto, UpdateDto } from './dto/index';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { Roles } from 'decorators/role.decorator';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { multerOptions } from 'common/multer/multer.config';
// import { CreateUserDto, FilterUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , email , phone , role , status , full_name  } = query;
    return this.userService.findAll(
      "user" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "email" ,"phone" ,"role" ,"status" , "full_name"], // search
      { email , phone , role , status , full_name },       // filer
      [ "id" , "full_name", "email", "phone", "role", "status", "avatar", "created_at", "updated_at", ] // show fileds
    );
  }

  @Get('me')
  async getMe(@Req() request: Request) {
    return this.userService.getMe(request);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @UploadedFile() file: any) {
    await this.userService.customPatch(dto)
    if (file) {
      dto.avatar = `${process.env.BASE_URL}/uploads/${file.filename}`;
    }
    return this.userService.update(id, dto);
  }

  
  // chagne the roles and the status of the user
  @Patch('role/:id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async updateRoleAndStatus(@Param('id') id: string, @Body() updateDto) {
    return this.userService.updateRoleAndStatus(id, updateDto);
  }
}
