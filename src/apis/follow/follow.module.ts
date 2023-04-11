import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowCount } from '../followCounts/followCount.entity';
import { User } from '../user/entities/user.entity';
import { Follow } from './entities/follow.entity';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow, FollowCount])],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
