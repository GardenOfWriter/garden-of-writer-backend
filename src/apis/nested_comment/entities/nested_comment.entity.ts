import { Field, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'nested_comment' })
@ObjectType()
export class NestedCommentEntity {
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

  @ManyToOne(() => CommentEntity, { onDelete: 'CASCADE' })
  @Field(() => CommentEntity)
  comment: CommentEntity;
}
