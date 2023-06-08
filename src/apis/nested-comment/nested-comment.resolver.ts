import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { NestedCommentService } from '@src/apis/nested-comment/nested-comment.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

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
    @Context() context: IContext,
  ) {
    const user = context.req.user.id;
    return this.nestedCommentService.create({
      user,
      commentId,
      nestedComment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteNestedComment(
    @Context() context: IContext,
    @Args('nestedCommentId') nestedCommentId: string,
  ) {
    const user = context.req.user.id;
    return this.nestedCommentService.delete({ nestedCommentId, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => NestedCommentEntity)
  async updateNestedComment(
    @Context() context: IContext,
    @Args('nestedCommentId') nestedCommentId: string,
    @Args('updateNestedComment') updateNestedComment: string,
  ) {
    const user = context.req.user.id;

    return this.nestedCommentService.update({
      nestedCommentId,
      updateNestedComment,
      user,
    });
  }
}
