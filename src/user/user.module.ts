import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { MailService } from 'common/nodemailer';
import { UserModel } from 'schemas/user.schema';

@Module({
  imports : [ MongooseModule.forFeature([{name: "User" , schema : UserModel}]) ],
  controllers: [UserController],
  providers: [UserService , MailService ],
})
export class UserModule {}
