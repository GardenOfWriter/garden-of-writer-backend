import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../Image/entities/image.entity';
import { FollowCount } from '../followCounts/followCount.entity';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

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
