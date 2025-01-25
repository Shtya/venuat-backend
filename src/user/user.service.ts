import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'common/nodemailer';
import {  I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entity/user/user.entity';
import { UpdateUserDto } from 'dto/user.dto';
import { BaseService } from 'common/base/base.service';
import { checkFieldExists } from 'utils/checkFieldExists';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(    
    @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private jwtService: JwtService,
      private readonly mailService: MailService,
      private readonly i18n: I18nService,
    ) {
      super(userRepository);
    }


    async getMe(request: any) {
      const authHeader = request.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(this.i18n.t("events.invalid_or_missing_token"));
      }
      const token = authHeader.split(' ')[1];
    
      let payload: any;
      try {
        payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      } catch (error) {
        throw new UnauthorizedException(this.i18n.t("events.invalid_token"));
      }
    
      const id = payload.id;
    
      // Find the user by ID
      const user = await this.userRepository.findOne({ where: { id } , select: ['id' , "phone" , "role" , "status" , 'email', 'full_name', 'created_at', 'updated_at'] });
      if (!user) throw new BadRequestException(this.i18n.t("events.not_found_in_database"));

      return user;
    }

    async updateRoleAndStatus(id: any, updateDto: UpdateUserDto) {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException(this.i18n.t('events.not_found_in_database'));
      }
    
      // Validate role and status
      if (!['admin', 'user'].includes(updateDto.role)) {
        throw new BadRequestException(this.i18n.t('events.invalid_role'));
      }
      if (!['active', 'inActive'].includes(updateDto.status)) {
        throw new BadRequestException(this.i18n.t('events.invalid_status'));
      }
    
      // Update role and status
      user.role = updateDto.role;
      user.status = updateDto.status;
      await this.userRepository.save(user);
    
      return user;
    }

    async customPatch (dto:UpdateUserDto){
      if(dto.phone)
      await checkFieldExists(this.repository  , {phone : dto.phone} , "this phone is already in use");
    }


}
