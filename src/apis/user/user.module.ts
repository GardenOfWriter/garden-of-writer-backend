import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/apis/mail/mail.service';
import { Board } from '../board/entities/board.entity';
import { FollowCount } from '../followCounts/followCount.entity';
import { Image } from '../Image/entities/image.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Image,
      Board,
      FollowCount,
    ]),
  ],

  providers: [
    UserResolver, //
    UserService,
    MailService,
  ],
})
export class UserModule {}
