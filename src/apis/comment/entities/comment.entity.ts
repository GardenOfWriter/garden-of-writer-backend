import { Field, ObjectType } from '@nestjs/graphql';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'comment' })
@ObjectType()
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  @Field(() => String, {
    description: '댓글',
  })
  content: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @Field(() => UserEntity, {
    description: '댓글을 작성한 유저',
  })
  user: UserEntity;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => BoardEntity, {
    description: '댓글이 달린 게시글',
  })
  board: BoardEntity;

  @ManyToOne(() => FictionBoardEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => FictionBoardEntity, {
    description: '댓글이 달린 소설 게시글',
  })
  fictionBoard: FictionBoardEntity;
}
