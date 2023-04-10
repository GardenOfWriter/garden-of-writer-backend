import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/commons/mail/mail.service';
import { Image } from '../Image/entities/image.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { userService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Image,
    ]),
  ],

  providers: [
    UserResolver, //
    userService,
    MailService,
  ],
})
export class UserModule {}
