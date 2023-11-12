import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from '@src/apis/board/board.service';
import { CreateBoardInput } from '@src/apis/board/dto/create-board.input';
import { UpdateBoardInput } from '@src/apis/board/dto/update-board.input';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

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
    @User() user: UserEntity, //
    @Args('boardId') boardId: string,
  ) {
    const userId = user.id;
    return this.boardService.findByMyUserId({ userId, boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [BoardEntity])
  fetchMyAllBoards(
    @User() user: UserEntity,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = user.id;
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
    @User() user: UserEntity,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    const userId = user.id;

    const result = await this.boardService.create({
      userId,
      createBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => BoardEntity)
  async updateBoard(
    @User() user: UserEntity,
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    const userId = user.id;

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
    @User() user: UserEntity, //
    @Args('boardId') boardId: string,
  ) {
    const userId = user.id;
    return this.boardService.delete({ userId, boardId });
  }
}
