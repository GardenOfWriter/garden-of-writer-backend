import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { NestedComment } from './entities/nested_comment.entity';
import { NestedCommentResolver } from './nested_comment.resolver';
import { NestedCommentService } from './nested_comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([NestedComment, User, Comment])],
  providers: [NestedCommentResolver, NestedCommentService],
})
export class NestedCommentModule {}
