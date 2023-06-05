import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { FictionBoardResolver } from '@src/apis/fiction_board/fiction_board.resolver';
import { FictionBoardService } from '@src/apis/fiction_board/fiction_board.service';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FictionBoardEntity, //
      UserEntity,
      CommentEntity,
    ]),
  ],
  providers: [FictionBoardResolver, FictionBoardService],
})
export class FictionBoardModule {}
