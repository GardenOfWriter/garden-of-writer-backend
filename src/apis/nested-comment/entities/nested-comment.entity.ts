import { Field, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'nested_comment' })
@ObjectType()
export class NestedCommentEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '유저 ID',
  })
  userId: string;

  @Column({
    type: 'uuid',
    name: 'comment_id',
    comment: '댓글 ID',
  })
  @Field(() => String, {
    description: '유저 ID',
  })
  commentId: string;

  @Column({
    name: '내용',
    type: 'varchar',
    length: 255,
    comment: '댓글 내용',
  })
  @Field(() => String, {
    description: '댓글 내용',
  })
  content: string;

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => CommentEntity, {
    description: '댓글',
  })
  comment: CommentEntity;
}
