import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { Pick } from './entities/pick.entity';
import { PicksService } from './picks.service';

@Resolver()
export class PicksResolver {
  constructor(
    private readonly picksService: PicksService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Pick])
  fetchMyPickBoards(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.picksService.findWithBoard({ userId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Pick])
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
