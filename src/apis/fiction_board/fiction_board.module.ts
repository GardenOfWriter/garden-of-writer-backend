import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@src/apis/comment/entities/comment.entity';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { FictionBoardResolver } from '@src/apis/fiction_board/fiction_board.resolver';
import { FictionBoardService } from '@src/apis/fiction_board/fiction_board.service';
import { User } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FictionBoard, //
      User,
      Comment,
    ]),
  ],
  providers: [FictionBoardResolver, FictionBoardService],
})
export class FictionBoardModule {}
