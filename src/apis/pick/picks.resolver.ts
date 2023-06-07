import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { PicksService } from '@src/apis/pick/picks.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class PicksResolver {
  constructor(
    private readonly picksService: PicksService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PickEntity])
  fetchMyPickBoards(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.picksService.findWithBoard({ userId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PickEntity])
  fetchMyPickFictionBoard(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.picksService.findWithFictionBoard({ userId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  pickBoard(
    @Args('boardId') boardId: string, //
    @Context() context: IContext,
  ) {
    const userId = context.req.user.id;
    return this.picksService.pickBoard({ boardId, userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  pickFictionBoard(
    @Args('fictionBoardId') fictionBoardId: string, //
    @Context() context: IContext,
  ) {
    const userId = context.req.user.id;
    return this.picksService.pickFictionBoard({ fictionBoardId, userId });
  }
}
