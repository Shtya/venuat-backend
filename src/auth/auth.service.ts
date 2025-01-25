
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'common/nodemailer';
import { I18nService } from 'nestjs-i18n';
import * as argon from 'argon2';
import { CreateUserDto } from 'dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly i18n: I18nService,
  ) {}

  async signup(dto: CreateUserDto) {
    await checkFieldExists(this.userRepository , {email: dto.email} , this.i18n.t('events.email_already_exists') );
    await checkFieldExists(this.userRepository , {phone: dto.phone} , "This phone is already exist." );
    
    const hash = await argon.hash(dto.password);
    const { password, status, role, ...rest } = dto;

    const user = this.userRepository.create({ password: hash, ...rest });
    const savedUser = await this.userRepository.save(user);

    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: savedUser.id },
      select: ['id' , "phone" , "role" , "status" , 'email', 'full_name', 'created_at', 'updated_at'] // Exclude 'password'
  });

    return userWithoutPassword;

  }

  async signin(dto: CreateUserDto) {
    
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException(this.i18n.t('events.invalid_email_or_password'));
    
    if (user?.status.toLowerCase() === 'inactive') throw new UnauthorizedException(`${this.i18n.t('events.account_inactive')} ${process.env.SUPPOR}`);
    
    const comparePassword = await argon.verify(user.password, dto.password);
    if (!comparePassword ) throw new UnauthorizedException(this.i18n.t('events.invalid_email_or_password'));


    // Generate JWT tokens
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    // Remove sensitive data before returning
    const { password, ...rest } = user;

    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id' , "phone" , "role" , "status" , 'email', 'full_name', 'created_at', 'updated_at'] // Exclude 'password'
  });

    return { ...userWithoutPassword, accessToken, refreshToken };
  }

  async resetPassword(dto: any) {
    const { email, otp, newPassword, confirmPassword, currentPassword } = dto;
  
    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      throw new BadRequestException(this.i18n.t('events.password_mismatch'));
    }
  
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.user_not_found'));
    }
  
    if (otp) {
      // Scenario 1: Reset password with OTP
      if (!user.otpToken || !user.otpExpire) {
        throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
      }
  
      const isOTPValid = await argon.verify(user.otpToken, otp);
      if (!isOTPValid || user.otpExpire < new Date()) {
        throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
      }
  
      // Update the user's password and clear the OTP fields
      const hashedPassword = await argon.hash(newPassword);
      await this.userRepository.update(user.id, {
        password: hashedPassword,
        otpToken: null, // Clear OTP token
        otpExpire: null, // Clear OTP expiration
      });
    } else {
      // Scenario 2: Change password with current password
      if (!currentPassword) {
        throw new BadRequestException(this.i18n.t('events.current_password_required'));
      }
  
      // Verify the current password
      const isCurrentPasswordValid = await argon.verify(user.password, currentPassword);
      if (!isCurrentPasswordValid) {
        throw new BadRequestException(this.i18n.t('events.current_password_incorrect'));
      }
  
      // Update the user's password
      const hashedPassword = await argon.hash(newPassword);
      await this.userRepository.update(user.id, {
        password: hashedPassword,
      });
    }
  
    return { message: this.i18n.t('events.password_reset_success') };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.user_not_found'));
    }

    if (user.otpExpire && user.otpExpire > new Date(Date.now() - 5 * 60 * 1000)) {
      // Calculate remaining time in seconds
      const remainingTimeInSeconds = Math.ceil(
        (user.otpExpire.getTime() - (Date.now() - 5 * 60 * 1000)) / 1000,
      );
    
      // Convert remaining time to minutes and seconds
      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;
    
      // Format as m:s
      const remainingTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
      throw new BadRequestException(
        this.i18n.t('events.try_after_5min', { args: { remainingTime: remainingTimeFormatted } }),
      );
    }
  
    const otp = await this.generateOTP(user.id); // Generate OTP
    await this.mailService.sendOTPEmail(email, otp); // Send OTP via email
  
    return { message: this.i18n.t('events.otp_sent') };
  }
  
  async generateOTP(userId: number): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const hashedOTP = await argon.hash(otp);
  
    await this.userRepository.update(userId, {
      otpToken : hashedOTP,
      otpExpire: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
    });
  
    return otp;
  }



  
  async generateAccessToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE, 
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = { id: user.id };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET, // Use a different secret for refresh tokens
      expiresIn: process.env.JWT_REFRESH_EXPIRE, // e.g., '7d' for 7 days
    });
  }

  async verifyRefreshToken(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_SECRET });
    if (!payload) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_refresh_token'));
    }

    const user = await this.userRepository.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException(this.i18n.t('events.user_not_found_generic'));
    }

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
}