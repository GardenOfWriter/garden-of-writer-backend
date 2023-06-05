import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntity } from '@src/apis/follow/entities/follow.entity';
import { FollowResolver } from '@src/apis/follow/follow.resolver';
import { FollowService } from '@src/apis/follow/follow.service';
import { FollowCountEntity } from '@src/apis/followCounts/followCount.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FollowEntity, FollowCountEntity]),
  ],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
