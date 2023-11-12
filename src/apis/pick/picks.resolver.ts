import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { PicksService } from '@src/apis/pick/picks.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Resolver()
export class PicksResolver {
  constructor(
    private readonly picksService: PicksService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PickEntity])
  fetchMyPickBoards(
    @User() user: UserEntity,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = user.id;
    return this.picksService.findWithBoard({ userId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PickEntity])
  fetchMyPickFictionBoard(
    @User() user: UserEntity,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = user.id;
    return this.picksService.findWithFictionBoard({ userId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  pickBoard(
    @Args('boardId') boardId: string, //
    @User() user: UserEntity,
  ) {
    const userId = user.id;
    return this.picksService.pickBoard({ boardId, userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  pickFictionBoard(
    @Args('fictionBoardId') fictionBoardId: string, //
    @User() user: UserEntity,
  ) {
    const userId = user.id;
    return this.picksService.pickFictionBoard({ fictionBoardId, userId });
  }
}
