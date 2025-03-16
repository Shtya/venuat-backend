import { BadRequestException, Body, Controller, Param, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Roles } from 'decorators/role.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'dto/user.dto';
import { Role } from 'entity/permission/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import * as dayjs from 'dayjs';
import { checkFieldExists } from 'utils/checkFieldExists';
import { User } from 'entity/user/user.entity';
import * as argon from 'argon2';



@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    let role = await this.roleRepository.findOne({ where: { name: dto.role } });

    if (!role) {
      role = this.roleRepository.create({ name: dto.role });
      await this.roleRepository.save(role);
    }

    // Check if email or phone already exists
    await checkFieldExists(this.userRepository, { email: dto.email }, this.authService.i18n.t('events.email_already_exists'), false, 400);
    await checkFieldExists(this.userRepository, { phone: dto.phone }, this.authService.i18n.t('events.phone_already_exists'), false, 400);

    // Hash the password
    const hash = await argon.hash(dto.password);


    // Generate a 6-digit OTP
    const otpCode = randomInt(100000, 999999);
    const otpExpire = dayjs().add(5, 'minutes').toDate(); // OTP expires in 10 minutes

    // Create user but keep status as "pending"
    const user = this.userRepository.create({
      password: hash,
      role : {...role} ,
      otpToken: otpCode.toString(),
      otpExpire,
      status: dto.status || 'pending', 
      full_name :dto?.full_name,
      email :dto?.email,
      phone :dto?.phone
    });

    const savedUser = await this.userRepository.save(user);

    if(dto.status) return { message: this.authService.i18n.t("events.success"), user: savedUser };
    // Send OTP via email
    await this.authService.mailService.sendOTPEmail(savedUser.email, otpCode.toString() , "verify email");

    return { message: this.authService.i18n.t("events.otp_sent2"), email: savedUser.email };
  }


  @Post('firebase-signin')
  async firebaseSignIn(@Body('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    try {
      return await this.authService.signInWithFirebase(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Register with Firebase (social login)
   */
  @Post('firebase-register')
  async socialRegister(@Body('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    try {
      return await this.authService.socialRegister(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  

  @Post('verify-otp')
  async verifyOtp(@Body() { email, otp }: { email: string; otp: string }) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException(this.authService.i18n.t("events.user_not_found"));
    if (user.status !== 'pending') throw new BadRequestException(this.authService.i18n.t("events.user_already_verified"));

    // Check OTP validity
    if (user.otpToken !== otp || dayjs().isAfter(user.otpExpire)) {
      throw new BadRequestException(this.authService.i18n.t("events.invalid_or_expired_otp"));
    }

    // Update user status to active and clear OTP fields
    user.status = 'active';
    user.otpToken = null;
    user.otpExpire = null;
    await this.userRepository.save(user);

    return { message: this.authService.i18n.t("events.account_verified_successfully") };
  }

  @Post('resend-otp')
async resendOtp(@Body() { email }: { email: string }) {
  // Find the user by email
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestException(this.authService.i18n.t("events.user_not_found_repeat"));
  }

  if (user.status !== 'pending') {
    throw new BadRequestException(this.authService.i18n.t("events.user_already_verified_or_invalid_request"));
  }

  // Generate a new OTP and expiry time
  const otpCode = randomInt(100000, 999999);
  const otpExpire = dayjs().add(5, 'minutes').toDate(); // OTP expires in 5 minutes

  // Update the OTP and expiry in the database
  user.otpToken = otpCode.toString();
  user.otpExpire = otpExpire;

  await this.userRepository.save(user);

  // Send OTP to the user's email
  await this.authService.mailService.sendOTPEmail(user.email, otpCode.toString(), "Verify email");

  return { message: this.authService.i18n.t("events.new_otp_sent") };
}


  @Post('signin')
  signin(@Body() dto) {
    return this.authService.signin(dto);
  }

  @Post('forgot-password')
  async forgot(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }




  // ! For password
  @Post('check-otp')
  async checkOtp(@Body() dto) {
    return this.authService.checkOtpCode(dto);
  }

  @Post('resend-forgot-password-otp')
async resendForgotPasswordOtp(@Body() { email }: { email: string }) {
  // Find the user by email
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestException(this.authService.i18n.t("events.user_not_found_repeat"));
  }

  // Generate a new OTP and expiry time
  const otpCode = randomInt(100000, 999999);
  const otpExpire = dayjs().add(5, 'minutes').toDate();  

  // Update the OTP and expiry in the database
  user.otpToken = otpCode.toString();
  user.otpExpire = otpExpire;

  await this.userRepository.save(user);

  // Send OTP to the user's email
  await this.authService.mailService.sendOTPEmail(user.email, otpCode.toString(), "Reset Password");

  return { message: this.authService.i18n.t("events.new_otp_sent") };
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
