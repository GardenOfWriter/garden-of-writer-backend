import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

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
