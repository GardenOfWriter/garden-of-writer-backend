import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@src/apis/board/entities/board.entity';
import { CommentResolver } from '@src/apis/comment/comment.resolver';
import { CommentService } from '@src/apis/comment/comment.service';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { User } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Board, FictionBoard])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
