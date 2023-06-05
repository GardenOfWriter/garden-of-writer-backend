import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@src/apis/auth/auth.controller';
import { AuthResolver } from '@src/apis/auth/auth.resolver';
import { AuthService } from '@src/apis/auth/auth.service';
import { FollowCount } from '@src/apis/followCounts/followCount.entity';
import { MailService } from '@src/apis/mail/mail.service';
import { User } from '@src/apis/user/entities/user.entity';
import { UserService } from '@src/apis/user/user.service';

@Module({
  imports: [
    CacheModule.register(),
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
      Image,
      FollowCount,
    ]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
