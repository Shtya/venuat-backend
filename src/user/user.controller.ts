import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, UseInterceptors, UploadedFile, UnauthorizedException, Req, UsePipes, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto, UpdateDto } from './dto/index';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';
import { CreateUserDto, FilterUserDto } from './dto/user.dto';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.userService.signup(dto);
  }

  @Post('auth/signin')
  signin(@Body() dto) {
    return this.userService.signin(dto);
  }

  
  @Post('auth/forgot-password')
  async forgot(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Post('auth/reset-password')
  async resetPassword(@Body() dto) {
    return this.userService.resetPassword(dto);
  }


  @Post('auth/refresh-token')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.userService.verifyRefreshToken(body.refreshToken);
  }

  // chagne the roles and the status of the user
  @Patch('user/role/:id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async updateRoleAndStatus(@Param('id') id: string, @Body() updateDto) {
    return this.userService.updateRoleAndStatus(id, updateDto);
  }




  @Get('users')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  async findAll(@Query() filterVendorDto: FilterUserDto) {
      return this.userService.findAll(filterVendorDto);
    }

  @Get('users/:id')
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Patch the information about the user
  @Patch('user/:id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto, @UploadedFile() file: any) {
    if (file) {
      updateDto.avatar = `${process.env.BASE_URL}/uploads/${file.filename}`;
    }
    return this.userService.update(id, updateDto);
  }

  @Get('user/me')
  async getMe(@Req() request: Request ) {
    return this.userService.getMe(request)

  }


}
