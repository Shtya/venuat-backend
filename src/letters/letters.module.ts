import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { Letter } from 'entity/user/letter.entity';
import { User } from 'entity/user/user.entity';
import { MailService } from 'common/nodemailer';

@Module({
  imports: [TypeOrmModule.forFeature([Letter , User])],
  providers: [LettersService, MailService],
  controllers: [LettersController ],
})
export class LettersModule {}
