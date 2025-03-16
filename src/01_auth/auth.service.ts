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
import { randomInt } from 'crypto';
import * as dayjs from 'dayjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    public readonly mailService: MailService,
    public readonly i18n: I18nService,
    private firebaseService: FirebaseService
  ) {}

  private async handleFirebaseUser(firebaseUser: { email: string; name: string; phone: string; picture: string | null }) {
    // Check if the user already exists in the database
    let user = await this.userRepository.findOne({
      where: { email: firebaseUser.email },
      relations: ['role'],
    });

    // If the user doesn't exist, create a new user
    if (!user) {
      user = this.userRepository.create({
        full_name: firebaseUser.name,
        email: firebaseUser.email,
        phone: firebaseUser.phone,
        password: '', // Firebase handles password
        avatar: firebaseUser.picture,
        status: 'active', // Automatically activate Firebase users
        role: { id: 2 }, // Assign a default role (e.g., 'user')
      });

      await this.userRepository.save(user);
    }

    // Generate access and refresh tokens
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    // Return user data without password
    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['role'],
      select: ['id', 'phone', 'role', 'status', 'email', 'full_name', 'avatar', 'created_at', 'updated_at'],
    });

    return { ...userWithoutPassword, accessToken, refreshToken };
  }

  /**
   * Sign in with Firebase
   */
  async signInWithFirebase(token: string) {

    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Invalid token');
    }

    // Verify the Firebase token
    try {
      const decodedToken = await this.firebaseService.verifyToken(token);

      if (!decodedToken) {
        throw new UnauthorizedException(this.i18n.t('events.invalid_token'));
      }

      // Get user info from Firebase
      const firebaseUser = {
        email: decodedToken.email,
        name: decodedToken.name || '',
        phone: decodedToken.phone_number || '',
        picture: decodedToken.picture || null,
      };

      return this.handleFirebaseUser(firebaseUser);
    } catch (error) {
      console.error('Error verifying token:', error); // Debugging: Log the error
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Register with Firebase (social login)
   */
  async socialRegister(token: string) {
    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Invalid token');
    }

    // Verify the Firebase token
    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid token');
      }

      // Get user info from Firebase
      const firebaseUser = {
        email: decodedToken.email,
        name: decodedToken.name || '',
        phone: decodedToken.phone_number || '',
        picture: decodedToken.picture || null,
      };

      return this.handleFirebaseUser(firebaseUser);
    } catch (error) {
      console.error('Error verifying token:', error); // Debugging: Log the error
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signin(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email }, relations: ['role'] });
    if (!user) throw new UnauthorizedException(this.i18n.t('events.invalid_email_or_password'));

    if (user.status === 'pending') {
      // Generate a new OTP if user status is 'pending'
      const otpCode = randomInt(100000, 999999); // Generate OTP
      const otpExpire = dayjs().add(5, 'minutes').toDate(); // OTP expires in 5 minutes

      // Update the user's OTP and expiry time in the database
      user.otpToken = otpCode.toString();
      user.otpExpire = otpExpire;

      await this.userRepository.save(user); // Save the updated user

      // Send OTP via email
      await this.mailService.sendOTPEmail(user.email, otpCode.toString(), 'verify email');

      // Throw an error to inform the user to check their email
      throw new globalError(this.i18n.t('events.check_your_email_for_verification'), 403);
    }

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

    await this.mailService.sendOTPEmail(email, otp, 'reset your password');

    return { message: this.i18n.t('events.otp_sent') };
  }

  async resetPassword(dto: any) {
    const { email, otp, newPassword, confirmPassword, currentPassword } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.user_not_found'));
    }
    // ✅ التأكد من أن المستخدم قام بتفعيل حسابه
    if (user.status !== 'active') {
      throw new UnauthorizedException('Your account is not verified. Please verify your email before signing in.');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException(this.i18n.t('events.password_mismatch'));
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

  async checkOtpCode(dto) {
    const { email, otp } = dto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.user_not_found'));
    }

    // Check if OTP is available and not expired
    if (!user.otpToken || !user.otpExpire || user.otpExpire < new Date()) {
      throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
    }

    // Validate OTP
    if (user.otpToken !== otp) {
      throw new BadRequestException(this.i18n.t('events.invalid_or_expired_otp'));
    }

    return { message: this.i18n.t('events.otp_valid') };
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
    if (!token) globalError(this.i18n.t('events.refresh_token_required'), 400);
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
