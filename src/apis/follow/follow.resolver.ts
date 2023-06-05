import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowerListOutput } from '@src/apis/follow/dto/followerList.output';
import { FollowingListOutput } from '@src/apis/follow/dto/followingList.output';
import { FollowService } from '@src/apis/follow/follow.service';
import { FollowCountEntity } from '@src/apis/followCounts/followCount.entity';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  follow(
    @Context() context: IContext,
    @Args('followingId') followingId: string,
  ) {
    const followerId = context.req.user.id;
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
    @Context() context: IContext, //
  ) {
    const userId = context.req.user.id;
    return this.followService.findFollowCount({ userId });
  }
}
