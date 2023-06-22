import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'comment' })
@ObjectType({
  description: '댓글',
})
export class CommentEntity extends BaseEntity {
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
    description: '유저 고유 ID',
  })
  boardId: string;

  @Column({
    type: 'uuid',
    name: 'fiction_board_id',
    comment: '소설 고유 ID',
  })
  @Field(() => String, {
    description: '유저 고유 ID',
  })
  fictionBoardId: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '댓글 본문',
  })
  @Field(() => String, {
    description: '댓글 본문',
  })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '댓글을 작성한 유저',
  })
  user: UserEntity;

  @ManyToOne(() => BoardEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  @Field(() => BoardEntity, {
    description: '댓글이 달린 게시글',
  })
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  @Field(() => FictionBoardEntity, {
    description: '댓글이 달린 소설 게시글',
  })
  fictionBoard: FictionBoardEntity;

  @OneToMany(
    () => NestedCommentEntity,
    (nestedComment) => nestedComment.comment,
  )
  @Field(() => [NestedCommentEntity], {
    description: '대댓글',
  })
  nestedComments: NestedCommentEntity[];
}
