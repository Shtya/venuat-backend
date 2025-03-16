import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Permission } from 'entity/permission/permissions.entity';
import { Role } from 'entity/permission/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly i18n: I18nService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!token) {
      throw new UnauthorizedException(this.i18n.t('events.sign_in_required'));
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      const user    = await this.userRepository.findOne({ where: { id: payload.id }, relations: ['role'] });

      if (!user) {
        throw new UnauthorizedException(this.i18n.t('events.user_not_found'));
      }

      request.user = user;

      // Check if the user is blocked (status is not active)
      if (user.status !== 'active') {
        throw new ForbiddenException(this.i18n.t('events.user_inactive'));
      }

      // If permissions are required, check if the user has the required permission in their role
      if (requiredPermissions) {
        const hasPermission = await this.hasPermission(user, requiredPermissions);

        if (!hasPermission) {
          throw new ForbiddenException(this.i18n.t('events.permission_denied' , {args : {permission : requiredPermissions}}));
        }
      }
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException(this.i18n.t('events.invalid_or_expired_token'));
    }


    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async hasPermission(user: User, requiredPermissions: string[]): Promise<boolean> {
    // Retrieve the role associated with the user (as a single role)
    const role = await this.roleRepository.findOne({
      where: { id: user.role.id as any },
      relations: ['permissions'], // Load the permissions associated with the role
    });

    // If no role found, deny access
    if (!role) {
      return false;
    }

    // Get the permission names for the role
    const rolePermissions = role.permissions.map(permission => permission.permission_name);

    // Check if the required permissions are included in the role's permissions
    return requiredPermissions.every(permission => rolePermissions.includes(permission));
  }
}
