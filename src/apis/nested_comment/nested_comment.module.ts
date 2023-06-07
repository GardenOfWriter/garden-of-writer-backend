import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@src/apis/Comment/entities/comment.entity';
import { NestedCommentEntity } from '@src/apis/nested_comment/entities/nested_comment.entity';
import { NestedCommentResolver } from '@src/apis/nested_comment/nested_comment.resolver';
import { NestedCommentService } from '@src/apis/nested_comment/nested_comment.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NestedCommentEntity, UserEntity, CommentEntity]),
  ],
  providers: [NestedCommentResolver, NestedCommentService],
})
export class NestedCommentModule {}
