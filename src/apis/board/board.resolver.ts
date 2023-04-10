import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/types/context';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardservice: BoardService, //
  ) {}

  @Query(() => Board)
  fetchBoard(
    @Args('boardId') boardId: string, //
  ) {
    return this.boardservice.findOneById({ boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Board)
  fetchMyBoard(
    @Context() context: IContext, //
    @Args('boardId') boardId: string,
  ) {
    const userId = context.req.user.id;
    return this.boardservice.findByMyUserId({ userId, boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board])
  fetchMyAllBoards(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.boardservice.findAllByMyUserId({ userId, page });
  }

  @Query(() => [Board])
  fetchAllBoards(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.boardservice.findAll({ page });
  }

  @Query(() => [Board])
  fetchAllBoardWithLikeCount(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.boardservice.findAllWithLikeCount({ page });
  }

  @Query(() => [Board])
  searchBoards(
    @Args('word') word: string, //
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ) {
    return this.boardservice.searchAllBoards({ word, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.boardservice.create({
      userId,
      createBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Context() context: IContext,
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.boardservice.update({
      boardId,
      userId,
      updateBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteBoard(
    @Context() context: IContext, //
    @Args('boardId') boardId: string,
  ) {
    const userId = context.req.user.id;
    return this.boardservice.delete({ userId, boardId });
  }
}
