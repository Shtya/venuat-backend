import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto/index';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { isValidObjectId } from 'mongoose';
import { MailService } from 'common/nodemailer';
import {  I18nService } from 'nestjs-i18n';
import { FilterUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private userModel,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly i18n: I18nService,
  ) {}


  //! send link to the gmail
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(this.i18n.t("events.user_not_found"));
    }

    const resetToken = await this.generateResetToken(user._id);

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await this.mailService.sendPasswordResetEmail(email, resetLink);
    return { message: this.i18n.t("events.password_reset_link_sent") };
  }

  async generateResetToken(userId: string): Promise<string> {
    const resetToken = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const hashedToken = await argon.hash(resetToken);

    await this.userModel.findByIdAndUpdate(userId, {
      resetPasswordToken: hashedToken,
      resetPasswordExpire: Date.now() + 10 * 60 * 1000, // Token valid for 10 minutes
    });

    return resetToken;
  }

  async resetPassword(dto) {
    const { token, currentPassword, newPassword, confirmPassword, userId } = dto;

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) throw new BadRequestException(this.i18n.t("events.password_mismatch"));

    let user;

    if (token) {
      // Scenario 1: Reset password with token

      user = await this.userModel.findOne({
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) throw new BadRequestException(this.i18n.t("events.invalid_or_expired_token"));

      const isTokenValid = await argon.verify(user.resetPasswordToken, token);
      if (!isTokenValid) throw new BadRequestException(this.i18n.t("events.invalid_or_expired_token"));
    } else {
      if (!userId) throw new BadRequestException('user id does not exist');
      if (!currentPassword) throw new BadRequestException('Current password is required');
      user = await this.userModel.findById(userId);

      if (!user) throw new BadRequestException('User not found');

      const isCurrentPasswordValid = await argon.verify(user.password, currentPassword);
      if (!isCurrentPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }
    }

    // Update the user's password and clear the reset token (if applicable)
    const hashedPassword = await argon.hash(newPassword);
    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpire: null,
    });

    return { message: this.i18n.t("events.password_reset_success") };
  }

  async signup(dto: CreateDto) {

    const emailIsExist = await this.userModel.findOne({ email: dto.email });
    if (emailIsExist) throw new BadRequestException(this.i18n.t("events.email_already_exists"))

    const hash = await argon.hash(dto.password);
    const { password, status, role, ...rest } = dto;

    try {
      const res = await this.userModel.create({ password: hash, ...rest })
      return res;
    } catch (err) {
      return err;
    }
  }

  async signin(dto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException(this.i18n.t("events.invalid_credentials"));
    }

    // Check if the user is active
    if (user.status === 'inActive') {
      throw new UnauthorizedException(`${this.i18n.t("events.account_inactive")} ${process.env.SUPPOR}`);
    }

    // verify password
    const comparePassword = await argon.verify(user.password, dto.password);
    if (!comparePassword) {
      throw new UnauthorizedException(this.i18n.t("events.invalid_email_or_password"));
    }

    // Generate JWT token
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    const userObject = user.toObject(); // Convert Mongoose Document to plain object
    const { password, __v, ...rest } = userObject;

    return { ...rest, accessToken, refreshToken };
  }

  async findAll(filterUserDto : FilterUserDto) {

    const { page = 1, limit = 10,  sort }: any = filterUserDto;

    const query: any = {};

    const sortOptions: any = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1; // 1 for ascending, -1 for descending
    }
    else { sortOptions._id = -1 }

    const data = await this.userModel
      .find(query)
      .sort(sortOptions ) // Apply sorting
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.userModel.countDocuments(query).exec();

    return { total, currentLimit: limit, currentPage: page, data };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t("events.invalid_object_id"));
    const findOne = await this.userModel.findById(id);
    if (!findOne) throw new BadRequestException(this.i18n.t("events.not_found_in_database"));

    return findOne;
  }

  async update(id: string, UpdateDto: UpdateDto) {
    const { password, role, email, status, ...rest } = UpdateDto;
    return this.userModel.findByIdAndUpdate(id, { ...rest }, { new: true });
  }

  async updateRoleAndStatus(id: string, updateDto) {
    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t("events.invalid_object_id"));
    const findOne = await this.userModel.findById(id);
    if (!findOne) throw new BadRequestException(this.i18n.t("events.not_found_in_database"));

    if (!['admin', 'user'].includes(updateDto.role)) throw new BadRequestException(this.i18n.t("events.invalid_role"));
    if (!['active', 'inActive'].includes(updateDto.status)) throw new BadRequestException(this.i18n.t("events.invalid_status"));
    return this.userModel.findByIdAndUpdate(
      id,
      { role: updateDto.role, status: updateDto.status },
      { new: true }, // Return the updated document
    );
  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { id: user._id, email: user.email, role: user.role };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE, // e.g., '15m' for 15 minutes
    });
  }

  async generateRefreshToken(user: any): Promise<string> {
    const payload = { id: user._id };
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET, // Use a different secret for refresh tokens
      expiresIn: process.env.JWT_REFRESH_EXPIRE, // e.g., '7d' for 7 days
    });
  }

  async verifyRefreshToken(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    if (!payload) throw new UnauthorizedException(this.i18n.t("events.invalid_refresh_token"));

    const user = await this.userModel.findById(payload.id);
    if (!user) throw new UnauthorizedException(this.i18n.t("events.user_not_found_generic"));

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  async getMe(request : any) {
    // console.log(first)
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(this.i18n.t("events.invalid_or_missing_token"));
    }
    const token = authHeader.split(' ')[1]

    
    let payload: any;

    try { payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET }); } 
    catch (error) { throw new UnauthorizedException(this.i18n.t("events.invalid_token")); }


    const id = payload.id; 

    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t("events.invalid_object_id"));
    const findOne = await this.userModel.findById(id);
    if (!findOne) throw new BadRequestException(this.i18n.t("events.not_found_in_database"));

    return findOne;
  }
}
