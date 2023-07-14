import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelCategoryLinkEntity } from 'entities/novel-category-link.entity';
import { Column, Entity, OneToMany } from 'typeorm';

/**
 * 카테고리 리스트업 되면 seeding 추가
 */
@Entity({ name: 'novel_category' })
@ObjectType({
  description: '소설 카테고리',
})
export class NovelCategoryEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    comment: '카테고리 명',
  })
  @Field(() => String, {
    description: '카테고리 명',
  })
  name: string;

  @OneToMany(
    () => NovelCategoryLinkEntity,
    (novelCategoryLink) => novelCategoryLink.novelCategory,
  )
  @Field(() => [NovelCategoryLinkEntity], {
    description: '소설 카테고리 링크 리스트',
  })
  novelCategoryLinks: NovelCategoryLinkEntity[];
}
