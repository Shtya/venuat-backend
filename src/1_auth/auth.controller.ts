import { BadRequestException, Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Roles } from 'decorators/role.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'dto/user.dto';
import { Role } from 'entity/permission/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    let role = await this.roleRepository.findOne({ where: { name: dto.role } });

    if (!role) {
      role = this.roleRepository.create({ name: dto.role });
      await this.roleRepository.save(role);
    }

    dto.role = role;
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto) {
    return this.authService.signin(dto);
  }

  @Post('forgot-password')
  async forgot(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto) {
    return this.authService.resetPassword(dto);
  }

  @Post('refresh-token')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.verifyRefreshToken(body.refreshToken);
  }
}
