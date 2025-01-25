import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Roles } from 'decorators/role.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
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
