import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { AttendList } from '../attend_list/entities/attend_list.entity';
import { BoardService } from '../board/board.service';
import { Image } from '../Image/entities/image.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Pick } from './entities/pick.entity';
import { PicksResolver } from './picks.resolver';
import { PicksService } from './picks.service';
import { FictionBoardService } from '../fiction_board/fiction_board.service';
import { FictionBoard } from '../fiction_board/entities/fiction_board.entity';

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
export class PicksModule {}
