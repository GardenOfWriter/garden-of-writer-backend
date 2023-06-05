import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@src/apis/Image/entities/image.entity';
import { Board } from '@src/apis/board/entities/board.entity';
import { FollowCount } from '@src/apis/followCounts/followCount.entity';
import { MailService } from '@src/apis/mail/mail.service';
import { User } from '@src/apis/user/entities/user.entity';
import { UserResolver } from '@src/apis/user/user.resolver';
import { UserService } from '@src/apis/user/user.service';

@Module({
  imports: [
    CacheModule.register(),
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
