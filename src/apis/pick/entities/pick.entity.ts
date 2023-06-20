import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'pick' })
@ObjectType()
export class PickEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'board_id',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '게시글 ID',
  })
  boardId: string;

  @Column({
    type: 'uuid',
    name: 'fiction_board_id',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '소설 ID',
  })
  fictionBoardId: string;

  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '유저 ID',
  })
  userId: string;

  @ManyToOne(() => BoardEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => BoardEntity, {
    description: '게시글',
  })
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => FictionBoardEntity, {
    description: '소설',
  })
  fictionBoard: FictionBoardEntity;

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;
}
