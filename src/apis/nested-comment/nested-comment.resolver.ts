import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { NestedCommentService } from '@src/apis/nested-comment/nested-comment.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Resolver()
export class NestedCommentResolver {
  constructor(
    private readonly nestedCommentService: NestedCommentService, //
  ) {}

  @Query(() => [NestedCommentEntity])
  fetchNestedComments(
    @Args('commentId') commentId: string, //
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.nestedCommentService.findAll({ commentId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedCommentEntity)
  createNestedComment(
    @Args('commentId') commentId: string, //
    @Args('nestedComment') nestedComment: string,
    @User() user: UserEntity,
  ) {
    const userId = user.id;
    return this.nestedCommentService.create({
      userId,
      commentId,
      nestedComment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteNestedComment(
    @User() user: UserEntity,
    @Args('nestedCommentId') nestedCommentId: string,
  ) {
    const userId = user.id;
    return this.nestedCommentService.delete({ nestedCommentId, userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedCommentEntity)
  async updateNestedComment(
    @User() user: UserEntity,
    @Args('nestedCommentId') nestedCommentId: string,
    @Args('updateNestedComment') updateNestedComment: string,
  ) {
    const userId = user.id;

    return this.nestedCommentService.update({
      nestedCommentId,
      updateNestedComment,
      userId,
    });
  }
}
