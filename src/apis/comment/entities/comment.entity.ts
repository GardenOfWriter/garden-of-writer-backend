import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @Field(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => BoardEntity)
  @Field(() => BoardEntity)
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity)
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;
}
