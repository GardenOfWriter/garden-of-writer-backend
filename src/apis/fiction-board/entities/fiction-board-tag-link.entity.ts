import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { TagEntity } from '@src/apis/tag/entities/tag.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'fiction_board_tag_link' })
@ObjectType()
export class FictionBoardTagLinkEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'fiction_board_id',
    comment: '소살 게시글 고유 ID',
  })
  @Field(() => String, {
    description: '소설 게시글 고유 ID',
  })
  fictionBoardId: string;

  @Column({
    type: 'uuid',
    name: 'tag_id',
    comment: '태그 고유 ID',
  })
  @Field(() => String, {
    description: '소설 태그 고유 ID',
  })
  tagId: string;

  @ManyToOne(() => FictionBoardEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => FictionBoardEntity, {
    description: '소설',
  })
  fictionBoard: FictionBoardEntity;

  @ManyToOne(() => TagEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => TagEntity, {
    description: '태그',
  })
  tag: TagEntity;
}
