import { Controller, Get , Body, Patch, Param, Delete, UseGuards , UseInterceptors, UploadedFile , Req , Query, Request, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'common/multer/multer.config';
import { UpdateUserDto } from 'dto/user.dto';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';


@Controller('')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService
  ) {}

  @Get('users')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.USERS_READ)

  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    

    return this.userService.FIND(
      'user',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      ["password","otpToken","otpExpire"],        // exclude some fields
      ['role', 'reservations'],                   // Relations 
      ["full_name" ,"email" ,"phone" ,"status" ], // search parameters
      restQueryParams                             // search with fields
    );
  }


  @Get('vendors')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.USERS_READ)
  async findAllVendors(@Query() query  ) {
    const { page, limit, search  , sortBy, sortOrder, ...restQueryParams }  = query  ;
    

    const data = await this.userService.FIND(
      'user',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      ["password","otpToken","otpExpire"],        // exclude some fields
      ['role', 'reservations'],                   // Relations 
      ["full_name" ,"email" ,"phone" ,"status" ], // search parameters
      restQueryParams                             // search with fields
    );

    return {
      limit: data.limit,
      countRecored: data.countRecored,
      page: data.page,
      data: data.data.filter(e => e.role.name == "vendor" )
    }
  }

  

  @Get('users/me')
  async getMe(@Req() request: Request) {
    return this.userService.getMe(request);
  }

  @Get('users/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.USERS_READ)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id, ['role']);
  }



  @Patch('users/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.USERS_UPDATE)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto, @UploadedFile() file: any , @Request() req:any ) {

    if(req.user.role.name != "admin"){
      if (id != req.user.id) {
        throw new ForbiddenException('You are not allowed to update someone else\'s data.');
      }
    }

    
    if (dto.phone) await checkFieldExists(this.userRepository, { phone: dto.phone }, 'this phone is already in use');
    if (dto.email) await checkFieldExists(this.userRepository, { email: dto.email }, 'this phone is already in use');
    if (file) dto.avatar = `${process.env.BASE_URL}/uploads/${file.filename}`;

    return this.userService.update(id, dto);
  }


  @Delete('users/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ADMIN)
  async deleteAccount(@Param('id') id: number , @Request() req : any ) {

    
    if(req.user.role.name != "admin"){
      if (id != req.user.id) {
        throw new ForbiddenException('You are not allowed to update someone else\'s data.');
      }
    }

    return this.userService.remove(id);
  }

  @Patch('users/:id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.USERS_UPDATE)
  async updateAccount(@Param('id') id: number, @Body() dto: UpdateUserDto, @UploadedFile() file: any , @Request() req : any ): Promise<User> {

    if(req.user.role.name != "admin"){
      if (id != req.user.id) {
        throw new ForbiddenException('You are not allowed to update someone else\'s data.');
      }
    }

    if (file) {
      dto.avatar = `${process.env.BASE_URL}/uploads/${file.filename}`;
    }
    return this.userService.updateAccount(id, dto);
  }




  @Patch('change-role/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ADMIN)
  async changeRole(@Param('id') id: string, @Body() updateDto) {
    return this.userService.updateRoleAndStatus(id, updateDto);
  }




  @Patch('block-account/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.ADMIN)
  async blockAccount(@Param('id') id: string, @Body() updateDto) {
    return this.userService.updateRoleAndStatus(id, updateDto);
  }
}



