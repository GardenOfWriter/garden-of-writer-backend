import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFictionBoardInput } from '@src/apis/fiction-board/dto/create-board.input';
import { UpdateFictionBoardInput } from '@src/apis/fiction-board/dto/update-board.input';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { FictionBoardService } from '@src/apis/fiction-board/fiction-board.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

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
    @User() user: UserEntity, //
    @Args('fictionBoardId') fictionBoardId: string,
  ) {
    const userId = user.id;
    return this.fictionBoardService.findByMyUserId({ userId, fictionBoardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FictionBoardEntity])
  fetchMyAllFictionBoards(
    @User() user: UserEntity,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    const userId = user.id;
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
    @User() user: UserEntity,
    @Args('createFictionBoardInput')
    createFictionBoardInput: CreateFictionBoardInput,
  ) {
    const userId = user.id;

    const result = await this.fictionBoardService.create({
      userId,
      createFictionBoardInput,
    });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FictionBoardEntity)
  async updateFictionBoard(
    @User() user: UserEntity,
    @Args('fictionBoardId') fictionBoardId: string,
    @Args('updateFictionBoardInput')
    updateFictionBoardInput: UpdateFictionBoardInput,
  ) {
    const userId = user.id;

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
    @User() user: UserEntity, //
    @Args('fictionBoardId') fictionBoardId: string,
  ) {
    const userId = user.id;
    return this.fictionBoardService.delete({ userId, fictionBoardId });
  }
}
