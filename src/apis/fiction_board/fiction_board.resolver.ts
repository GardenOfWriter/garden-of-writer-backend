import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFictionBoardInput } from '@src/apis/fiction_board/dto/createBoard.input';
import { UpdateFictionBoardInput } from '@src/apis/fiction_board/dto/updateBoard.input';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { FictionBoardService } from '@src/apis/fiction_board/fiction_board.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class FictionBoardResolver {
  constructor(
    private readonly fictionBoardService: FictionBoardService, //
  ) {}

  @Query(() => FictionBoardEntity)
  fetchBoard(
    @Args('fictionBoardId') fictionBoardId: string, //
  ) {
    return this.fictionBoardService.findOneById({ fictionBoardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => FictionBoardEntity)
  fetchMyFictionBoard(
    @Context() context: IContext, //
    @Args('fictionBoardId') fictionBoardId: string,
  ) {
    const userId = context.req.user.id;
    return this.fictionBoardService.findByMyUserId({ userId, fictionBoardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FictionBoardEntity])
  fetchMyAllFictionBoards(
    @Context() context: IContext,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = context.req.user.id;
    return this.fictionBoardService.findAllByMyUserId({ userId, page });
  }

  @Query(() => [FictionBoardEntity])
  fetchAllFictionBoard(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.fictionBoardService.findAll({ page });
  }

  @Query(() => [FictionBoardEntity])
  fetchAllFictionBoardWithLikeCount(
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.fictionBoardService.findAllWithLikeCount({ page });
  }
  @Query(() => [FictionBoardEntity])
  searchBoards(
    @Args('word') word: string, //
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ) {
    return this.fictionBoardService.searchAllBoard({ word, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FictionBoardEntity)
  async createFictionBoard(
    @Context() context: IContext,
    @Args('createFictionBoardInput')
    createFictionBoardInput: CreateFictionBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.fictionBoardService.create({
      userId,
      createFictionBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FictionBoardEntity)
  async updateFictionBoard(
    @Context() context: IContext,
    @Args('fictionBoardId') fictionBoardId: string,
    @Args('updateFictionBoardInput')
    updateFictionBoardInput: UpdateFictionBoardInput,
  ) {
    const userId = context.req.user.id;

    const result = await this.fictionBoardService.update({
      fictionBoardId,
      userId,
      updateFictionBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteFictionBoard(
    @Context() context: IContext, //
    @Args('fictionBoardId') fictionBoardId: string,
  ) {
    const userId = context.req.user.id;
    return this.fictionBoardService.delete({ userId, fictionBoardId });
  }
}
