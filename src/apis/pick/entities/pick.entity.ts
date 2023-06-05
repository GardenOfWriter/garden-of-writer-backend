import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '@src/apis/board/entities/board.entity';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { User } from '@src/apis/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Pick {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @Field(() => Board)
  board: Board;

  @ManyToOne(() => FictionBoard, { onDelete: 'CASCADE' })
  @Field(() => FictionBoard)
  fictionBoard: FictionBoard;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
