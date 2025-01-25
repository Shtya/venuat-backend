import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Roles } from '../../decorators/role.decorator';
import { I18nService } from 'nestjs-i18n';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly i18n: I18nService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly userService: UserService, // Inject UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const requiredRoles = this.reflector.get(Roles, context.getHandler());

    if (!requiredRoles) return true;
    if (!token) { throw new UnauthorizedException(this.i18n.t("events.sign_in_required")); }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      const user =  await this.userRepository.findOne({ where: { id : payload.sub } as any} ); // Assuming `sub` contains the user ID
      request['user'] = user;
;
      if (user.status != "active" ) 
        throw new ForbiddenException(this.i18n.t('events.user_inactive'));
      
      const hasRole = requiredRoles.some((role) => payload.role == role);
      if (!hasRole) {
        throw new ForbiddenException(this.i18n.t("events.permission_denied"));
      }
    } 
    
    catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException(this.i18n.t("events.invalid_or_expired_token"));
    }


    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
