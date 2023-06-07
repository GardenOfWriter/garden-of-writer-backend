import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from '@src/apis/board/board.service';
import { CreateBoardInput } from '@src/apis/board/dto/createBoard.input';
import { UpdateBoardInput } from '@src/apis/board/dto/updateBoard.input';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //
  ) {}

  @Query(() => BoardEntity)
  fetchBoard(
    @Args('boardId') boardId: string, //
  ) {
    return this.boardService.findOneById({ boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => BoardEntity)
  fetchMyBoard(
    @Context() context: IContext, //
    @Args('boardId') boardId: string,
  ) {
    const userId = context.req.user.id;
    return this.boardService.findByMyUserId({ userId, boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [BoardEntity])
  fetchMyAllBoards(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.boardService.findAllByMyUserId({ userId, page });
  }

  @Query(() => [BoardEntity])
  fetchAllBoards(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.boardService.findAll({ page });
  }

  @Query(() => [BoardEntity])
  fetchAllBoardWithLikeCount(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.boardService.findAllWithLikeCount({ page });
  }

  @Query(() => [BoardEntity])
  searchBoards(
    @Args('word') word: string, //
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ) {
    return this.boardService.searchAllBoards({ word, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => BoardEntity)
  async createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.boardService.create({
      userId,
      createBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => BoardEntity)
  async updateBoard(
    @Context() context: IContext,
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.boardService.update({
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
    return this.boardService.delete({ userId, boardId });
  }
}
