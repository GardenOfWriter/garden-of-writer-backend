import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { FictionBoard } from '../fiction_board/entities/fiction_board.entity';
import { User } from '../user/entities/user.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Board, FictionBoard])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
