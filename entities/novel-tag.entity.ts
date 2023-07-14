import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelEntity } from 'entities/novel.entity';
import { UserEntity } from 'entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

/**
 * @todo 담당자가 고도화
 */
@Entity({ name: 'novel_tag' })
@ObjectType({
  description: '소설 태그',
})
export class NovelTagEntity extends BaseEntity {
  @Column({
    type: 'int',
    unsigned: true,
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  @Field(() => Number, {
    description: '유저 고유 ID',
  })
  userId: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'novel_tag_id',
    comment: '소설 고유 ID',
  })
  @Field(() => Number, {
    description: '소설 고유 ID',
  })
  novelId: number;

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

  @ManyToOne(() => UserEntity, (user) => user.novelTags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelTags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;
}
