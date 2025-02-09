import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'common/nodemailer';
import { I18nService } from 'nestjs-i18n';
import * as argon from 'argon2';
import { CreateUserDto } from 'dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { checkFieldExists, globalError } from 'utils/checkFieldExists';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly i18n: I18nService
  ) {}

  async signup(dto: CreateUserDto) {
    await checkFieldExists(this.userRepository, { email: dto.email }, this.i18n.t('events.email_already_exists'), false, 400);
    await checkFieldExists(this.userRepository, { phone: dto.phone }, this.i18n.t("events.phone_already_exists") , false, 400);

    const hash = await argon.hash(dto.password);
    const { password, status, role, ...rest } = dto;

    const user = this.userRepository.create({ password: hash, role, ...rest });
    const savedUser = await this.userRepository.save(user);

    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['role'],
      select: ['id', 'phone', 'role', 'status', 'email', 'full_name', 'created_at', 'updated_at'],
    });
    

    return userWithoutPassword;
  }

  async signin(dto: CreateUserDto) {
    
    const user = await this.userRepository.findOne({ where: { email: dto.email }, relations: ['role'] });
    if (!user) throw new UnauthorizedException(this.i18n.t('events.invalid_email_or_password'));

    const comparePassword = await argon.verify(user.password, dto.password);
    if (!comparePassword) throw new UnauthorizedException(this.i18n.t('events.invalid_email_or_password'));

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['role'],
      select: ['id', 'phone', 'role', 'status', 'email', 'full_name', 'created_at', 'updated_at'],
    });

    return { ...userWithoutPassword, accessToken, refreshToken };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    await checkFieldExists(this.userRepository, { email }, this.i18n.t('events.user_not_found'), true, 404);

    if (user.otpExpire && user.otpExpire > new Date()) {
      const remainingTimeInSeconds = Math.ceil((user.otpExpire.getTime() - Date.now()) / 1000);

      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;

      const remainingTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      throw new globalError(this.i18n.t('events.try_after_5min', { args: { remainingTime: remainingTimeFormatted } }), 429);
    }

    const otp = await this.generateOTP(user.id);

    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    await this.userRepository.update(user.id, {
      otpToken: otp,
      otpExpire: otpExpire,
    });

    await this.mailService.sendOTPEmail(email, otp);

    return { message: this.i18n.t('events.otp_sent') };
  }

  async resetPassword(dto: any) {
    const { email, otp, newPassword, confirmPassword, currentPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(this.i18n.t('events.password_mismatch'));
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.user_not_found'));
    }

    if (otp) {
      if (!user.otpToken || !user.otpExpire) {
        throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
      }

      if (user.otpToken !== otp || user.otpExpire < new Date()) {
        throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
      }

      const hashedPassword = await argon.hash(newPassword);
      await this.userRepository.update(user.id, {
        password: hashedPassword,
        otpToken: null,
        otpExpire: null,
      });
    } else {
      if (!currentPassword) {
        throw new BadRequestException(this.i18n.t('events.current_password_required'));
      }

      const isCurrentPasswordValid = await argon.verify(user.password, currentPassword);
      if (!isCurrentPasswordValid) {
        throw new BadRequestException(this.i18n.t('events.current_password_incorrect'));
      }

      const hashedPassword = await argon.hash(newPassword);
      await this.userRepository.update(user.id, {
        password: hashedPassword,
      });
    }

    return { message: this.i18n.t('events.password_reset_success') };
  }

  async generateOTP(userId: number): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await argon.hash(otp);

    await this.userRepository.update(userId, {
      otpToken: hashedOTP,
      otpExpire: new Date(Date.now() + 10 * 60 * 1000),
    });

    return otp;
  }


  

  async generateAccessToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role.id };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email, role: user.role.id };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
  }

  async verifyRefreshToken(token: string): Promise<any> {
    if(!token) globalError(this.i18n.t('events.refresh_token_required'), 400);
    const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_SECRET });
    
    if (!payload) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_refresh_token'));
    }

    const user = await this.userRepository.findOne({ where: { id: payload.id }, relations: ['role'] });
    if (!user) {
      throw new UnauthorizedException(this.i18n.t('events.user_not_found_generic'));
    }

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
}
