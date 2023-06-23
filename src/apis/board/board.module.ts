import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardResolver } from '@src/apis/board/board.resolver';
import { BoardService } from '@src/apis/board/board.service';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardEntity, //
      UserEntity,
      CommentEntity,
    ]),
  ],

  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
