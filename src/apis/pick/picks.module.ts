import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendListEntity } from '@src/apis/attend-list/entities/attend-list.entity';
import { BoardService } from '@src/apis/board/board.service';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { FictionBoardService } from '@src/apis/fiction-board/fiction-board.service';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { PicksResolver } from '@src/apis/pick/picks.resolver';
import { PicksService } from '@src/apis/pick/picks.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickEntity, //
      UserEntity,
      BoardEntity,
      FictionBoardEntity,
      ImageEntity,
      AttendListEntity,
      CommentEntity,
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
