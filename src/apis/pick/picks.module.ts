import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendList } from '@src/apis/attend_list/entities/attend_list.entity';
import { BoardService } from '@src/apis/board/board.service';
import { Board } from '@src/apis/board/entities/board.entity';
import { Comment } from '@src/apis/comment/entities/comment.entity';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { FictionBoardService } from '@src/apis/fiction_board/fiction_board.service';
import { Image } from '@src/apis/image/entities/image.entity';
import { Pick } from '@src/apis/pick/entities/pick.entity';
import { PicksResolver } from '@src/apis/pick/picks.resolver';
import { PicksService } from '@src/apis/pick/picks.service';
import { User } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pick, //
      User,
      Board,
      FictionBoard,
      Image,
      AttendList,
      Comment,
    ]),
  ],

  providers: [
    PicksResolver, //
    PicksService,
    BoardService,
    FictionBoardService,
  ],
})
export class PickModule {}
