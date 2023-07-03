import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelEntity } from 'entities/novel.entity';
import { UserEntity } from 'entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'novel_comment' })
@ObjectType({
  description: '소설 댓글',
})
export class NovelCommentEntity extends BaseEntity {
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
    description: '소설 고유 ID',
  })
  novelId: number;

  /**
   * @description 기획에 따라 text 로 변경될 수 있음
   */
  @Column({
    type: 'varchar',
    length: '255',
    name: 'description',
    comment: '소설 댓글',
  })
  @Field(() => String, {
    description: '소설 댓글',
  })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.novelComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;
}
