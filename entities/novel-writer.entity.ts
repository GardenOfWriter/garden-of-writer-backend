import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelEntity } from 'entities/novel.entity';
import { UserEntity } from 'entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

/**
 * @description novel_recruit.status 에 따라 결정된다.
 */
@Entity({ name: 'novel_writer' })
@ObjectType({
  description: '소설 작성자',
})
export class NovelWriterEntity extends BaseEntity {
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
    name: 'novel_id',
    comment: '소설 고유 ID',
  })
  @Field(() => Number, {
    description: '소설고유 ID',
  })
  novelId: number;

  @Column({
    type: 'boolean',
    name: 'is_owner',
    comment: '소설 소유자 여부',
  })
  @Field(() => Boolean, {
    description: '소설 소유자 여부',
  })
  isOwner: boolean;

  @ManyToOne(() => UserEntity, (user) => user.novelWriters, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelWriters, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;
}
