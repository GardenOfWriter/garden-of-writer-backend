import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'attend_list' })
@ObjectType({
  description: '참석자 리스트',
})
export class AttendListEntity extends BaseEntity {
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
    name: 'fiction_board_id',
    comment: '소설 게시글 고유 ID',
  })
  @Field(() => String, {
    description: '소설 게시글 고유 ID',
  })
  fictionBoardId: string;

  @ManyToOne(() => UserEntity, (user) => user.attendLists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(
    () => FictionBoardEntity,
    (fictionBoard) => fictionBoard.attendLists,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  @Field(() => FictionBoardEntity, {
    description: '소설',
  })
  fictionBoard: FictionBoardEntity;
}
