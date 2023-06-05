import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '@src/apis/follow/entities/follow.entity';
import { FollowResolver } from '@src/apis/follow/follow.resolver';
import { FollowService } from '@src/apis/follow/follow.service';
import { FollowCount } from '@src/apis/followCounts/followCount.entity';
import { User } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow, FollowCount])],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
