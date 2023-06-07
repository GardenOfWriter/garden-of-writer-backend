import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@src/apis/Image/entities/image.entity';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FollowCountEntity } from '@src/apis/followCounts/followCount.entity';
import { MailService } from '@src/apis/mail/mail.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { UserResolver } from '@src/apis/user/user.resolver';
import { UserService } from '@src/apis/user/user.service';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([
      UserEntity, //
      ImageEntity,
      BoardEntity,
      FollowCountEntity,
    ]),
  ],

  providers: [
    UserResolver, //
    UserService,
    MailService,
  ],
})
export class UserModule {}
