import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'entity/permission/permissions.entity';
import { Role } from 'entity/permission/role.entity';
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
