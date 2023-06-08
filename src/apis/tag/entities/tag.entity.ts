import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardTagLinkEntity } from '@src/apis/fiction_board/entities/fiction-board-tag-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tag' })
@ObjectType()
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(
    () => FictionBoardTagLinkEntity,
    (fictionBoardTagLinkEntity) => fictionBoardTagLinkEntity.tagId,
  )
  @Field(() => [FictionBoardTagLinkEntity], { nullable: true })
  fictionBoardTagLinks: FictionBoardTagLinkEntity[];
}
