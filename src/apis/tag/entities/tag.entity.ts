import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardTagLinkEntity } from '@src/apis/fiction_board/entities/fiction-board-tag-link.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'tag' })
@ObjectType()
export class TagEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    comment: '태그 명',
  })
  @Field(() => String, {
    description: '태그 명',
  })
  name: string;

  @OneToMany(
    () => FictionBoardTagLinkEntity,
    (fictionBoardTagLinkEntity) => fictionBoardTagLinkEntity.tagId,
  )
  @Field(() => [FictionBoardTagLinkEntity], {
    description: '소설 태그 링크',
  })
  fictionBoardTagLinks: FictionBoardTagLinkEntity[];
}
