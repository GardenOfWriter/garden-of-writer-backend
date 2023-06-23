import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'pick' })
@ObjectType({
  description: '찜',
})
export class PickEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  @Field(() => String, {
    description: '유저 고유 ID',
  })
  userId: string;

  @Column({
    type: 'uuid',
    name: 'board_id',
    comment: '게시글 고유 ID',
  })
  @Field(() => String, {
    description: '게시글 고유 ID',
  })
  boardId: string;

  @Column({
    type: 'uuid',
    name: 'fiction_board_id',
    comment: '소설 고유 ID',
  })
  @Field(() => String, {
    description: '소설 고유 ID',
  })
  fictionBoardId: string;

  @ManyToOne(() => UserEntity, (user) => user.picks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (board) => board.picks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  @Field(() => BoardEntity, {
    description: '게시글',
  })
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity, (fictionBoard) => fictionBoard.picks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  @Field(() => FictionBoardEntity, {
    description: '소설',
  })
  fictionBoard: FictionBoardEntity;
}
