import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardResolver } from '@src/apis/board/board.resolver';
import { BoardService } from '@src/apis/board/board.service';
import { Board } from '@src/apis/board/entities/board.entity';
import { User } from '@src/apis/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board, //
      User,
      Comment,
    ]),
  ],

  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
