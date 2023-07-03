import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { NovelCategoryEntity } from 'entities/novel-category.entity';
import { NovelEntity } from 'entities/novel.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

/**
 * @todo 담당자가 고도화
 */
@Entity({ name: 'novel_category_link' })
@ObjectType({
  description: '소설 카테고리 링크',
})
export class NovelCategoryLinkEntity extends BaseEntity {
  @Column({
    type: 'int',
    unsigned: true,
    name: 'novel_id',
    comment: '소설 고유 ID',
  })
  @Field(() => Number, {
    description: '소설 고유 ID',
  })
  novelId: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'novel_category_id',
    comment: '소설 카테고리 고유 ID',
  })
  @Field(() => Number, {
    description: '소설 카테고리 고유 ID',
  })
  novelCategoryId: number;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelCategoryLinks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;

  @ManyToOne(
    () => NovelCategoryEntity,
    (novelCategory) => novelCategory.novelCategoryLinks,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'novel_category_id', referencedColumnName: 'id' }])
  @Field(() => NovelCategoryEntity, {
    description: '소설 카테고리',
  })
  novelCategory: NovelCategoryEntity;
}
