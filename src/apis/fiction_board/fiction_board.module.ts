import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { FictionBoard } from './entities/fiction_board.entity';
import { FictionBoardResolver } from './fiction_board.resolver';
import { FictionBoardService } from './fiction_board.service';

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
