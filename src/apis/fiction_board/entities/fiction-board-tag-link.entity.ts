import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { TagEntity } from '@src/apis/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fiction_board_tag_link' })
@ObjectType()
export class FictionBoardTagLinkEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('uuid', {
    name: 'fiction_board_id',
    comment: '소살 게시글 고유 ID',
  })
  fictionBoardId: string;

  @Column('uuid', {
    name: 'tag_id',
    comment: '태그 고유 ID',
  })
  tagId: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => FictionBoardEntity, { onDelete: 'CASCADE' })
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;

  @ManyToOne(() => TagEntity)
  @Field(() => TagEntity)
  tag: TagEntity;
}
