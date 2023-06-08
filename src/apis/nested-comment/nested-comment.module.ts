import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { NestedCommentResolver } from '@src/apis/nested-comment/nested-comment.resolver';
import { NestedCommentService } from '@src/apis/nested-comment/nested-comment.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NestedCommentEntity, UserEntity, CommentEntity]),
  ],
  providers: [NestedCommentResolver, NestedCommentService],
})
export class NestedCommentModule {}
