import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { NovelEntity } from 'entities/novel.entity';
import { UserEntity } from 'entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

enum NovelRecruitStatus {
  Pending = 'pending',
  Approve = 'approve',
  Reject = 'reject',
  Drop = 'drop',
}

@Entity({ name: 'novel_recruit' })
@ObjectType({
  description: '소설 모집',
})
export class NovelRecruitEntity extends BaseEntity {
  @Column({
    type: 'enum',
    name: 'status',
    comment: '소설 모집 상태',
    enum: NovelRecruitStatus,
  })
  @Field(() => NovelRecruitStatus, {
    description: '소설 모집 상태',
  })
  status: NovelRecruitStatus;

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

  @ManyToOne(() => UserEntity, (user) => user.novelRecruits, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelRecruits, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;
}
