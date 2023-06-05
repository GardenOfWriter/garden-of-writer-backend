import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentResolver } from '@src/apis/comment/comment.resolver';
import { CommentService } from '@src/apis/comment/comment.service';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      UserEntity,
      BoardEntity,
      FictionBoardEntity,
    ]),
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
