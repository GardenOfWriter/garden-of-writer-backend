import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@src/apis/Image/entities/image.entity';
import { MailResolver } from '@src/apis/mail/mail.resolver';
import { MailService } from '@src/apis/mail/mail.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { UserService } from '@src/apis/user/user.service';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([
      UserEntity, //
      ImageEntity,
    ]),
  ],
  providers: [
    MailResolver, //
    MailService,
    UserService,
  ],
})
export class EmailModule {}
