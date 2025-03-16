import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'common/nodemailer';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User } from 'entity/user/user.entity';
import { UpdateUserDto } from 'dto/user.dto';
import { BaseService } from 'common/base/base.service';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Role } from 'entity/permission/role.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
    private readonly mailService: MailService,

  ) {
    super(userRepository);
  }

  async getMe(request: any) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_or_missing_token') );
    }
    const token = authHeader.split(' ')[1];

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_token'));
    }

    const id = payload.id;

    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role' , "reservations.venue.property",  "reservations.venue.property.city" ,  "reservations.venue.property.city.country" ,  "reservations" , "reservations.venue" , "reservations.venue.venueGalleries" ] });
    if (!user) throw new BadRequestException(this.i18n.t('events.not_found_in_database'));

    return user;
  }


  async getMeDetails(request: any) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_or_missing_token') );
    }
    const token = authHeader.split(' ')[1];

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new UnauthorizedException(this.i18n.t('events.invalid_token'));
    }

    const id = payload.id;

    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id },       relations: [
      'role' , 
      // "reservations.venue.property",  "reservations.venue.property.city" ,  "reservations.venue.property.city.country" ,  
      // "reservations" , 
      "reservations.venue" , 
      "reservations.venue.venueServices.service" , 
      "reservations.venue.venueEquipments.equipment" , 

      "reservations.venue.venuePackages" , 
      // "reservations.venue.venuePackages.services" , "reservations.venue.venuePackages.services.service" , 
      // "reservations.venue.venuePackages.equipments" , "reservations.venue.venuePackages.equipments.equipment" , 
      // "reservations.venue.venueGalleries" 
      ]  });
    if (!user) throw new BadRequestException(this.i18n.t('events.not_found_in_database'));

    return user;
  }

  async updateRoleAndStatus(id: any, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.not_found_in_database'));
    }

    // Validate role and status
    if (dto?.role) {
      if (isNaN(Number(dto.role))) {
        throw new BadRequestException('Role should be ID'); // Or your desired error message
      }
      await checkFieldExists(this.roleRepository, { id: dto.role }, "this role it doesn't exist", true);
    }

    if (dto?.status && !['active', 'inActive'].includes(dto.status)) {
      throw new BadRequestException(this.i18n.t('events.invalid_status'));
    }

    user.role = dto.role;
    user.status = dto.status;
    await this.userRepository.save(user);

    return user;
  }


  async updateAccount(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }  });
    if (!user) {
      throw new BadRequestException(this.i18n.t('events.not_found_in_database'));
    }

    if (dto.phone) 
      await checkFieldExists(this.userRepository, { phone: dto.phone }, 'this phone is already in use', true , 409 );

    if (dto.email) 
      await checkFieldExists(this.userRepository, { email: dto.email }, 'this email is already in use', true , 409);
    

    Object.assign(user, dto);
    await this.userRepository.save(user);

    return user;
  }
}
