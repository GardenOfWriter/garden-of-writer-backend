import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowerListOutput } from '@src/apis/follow/dto/follower-list.output';
import { FollowingListOutput } from '@src/apis/follow/dto/following-list.output';
import { FollowService } from '@src/apis/follow/follow.service';
import { FollowCountEntity } from '@src/apis/follow-counts/follow-count.entity';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  follow(
    @User() user: UserEntity, //
    @Args('followingId') followingId: string,
  ) {
    const followerId = user.id;
    return this.followService.follow({ followerId, followingId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FollowerListOutput])
  fetchFollower(
    @Args('userId') userId: string, //
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ) {
    return this.followService.findUserFollowing({ userId, page });
  }

  @Query(() => [FollowingListOutput])
  fetchFollowing(
    @Args('userId') userId: string, //
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ) {
    return this.followService.findUserFollowing({ userId, page });
  }

  @Query(() => FollowCountEntity)
  fetchFollowCount(
    @Args('userId') userId: string, //
  ) {
    return this.followService.findFollowCount({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => FollowCountEntity)
  fetchMyFollowCount(
    @User() user: UserEntity, //
  ) {
    const userId = user.id;
    return this.followService.findFollowCount({ userId });
  }
}
