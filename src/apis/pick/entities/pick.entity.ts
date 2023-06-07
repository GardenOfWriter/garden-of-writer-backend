import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PickEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @Field(() => BoardEntity)
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity, { onDelete: 'CASCADE' })
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;

  @ManyToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
