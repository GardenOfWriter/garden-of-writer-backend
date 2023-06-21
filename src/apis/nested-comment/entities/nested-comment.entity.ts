import { Field, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'nested_comment' })
@ObjectType({
  description: '대댓글',
})
export class NestedCommentEntity extends BaseEntity {
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
    name: 'comment_id',
    comment: '댓글 고유 ID',
  })
  @Field(() => String, {
    description: '댓글 고유 ID',
  })
  commentId: string;

  @Column({
    name: 'content',
    type: 'varchar',
    length: 255,
    comment: '댓글 내용',
  })
  @Field(() => String, {
    description: '댓글 내용',
  })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.nestedComments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.nestedComments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'comment_id', referencedColumnName: 'id' }])
  @Field(() => CommentEntity, {
    description: '댓글',
  })
  comment: CommentEntity;
}
