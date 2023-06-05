import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from '@src/apis/comment/comment.service';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService, //
  ) {}

  @Query(() => [CommentEntity])
  fetchComments(
    @Args('boardId') boardId: string, //
    @Args('fictionBoardId') fictionBoardId: string,
    @Args('page', { nullable: true, type: () => Int }) page: number,
  ) {
    return this.commentService.findAll({ boardId, fictionBoardId, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => CommentEntity)
  createComment(
    @Args('boardId') boardId: string, //
    @Args('fictionBoardId') fictionBoardId: string,
    @Args('comment') comment: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user.id;
    return this.commentService.create({
      user,
      boardId,
      fictionBoardId,
      comment,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => CommentEntity)
  async updateComment(
    @Args('commentId') commentId: string,
    @Args('updateComment') updateComment: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user.id;

    return this.commentService.update({
      commentId,
      updateComment,
      user,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteComment(
    @Args('commentId') commentId: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user.id;
    return this.commentService.delete({ commentId, user });
  }
}
