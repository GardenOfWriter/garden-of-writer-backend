import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

/**
 * @todo 필드명 변경
 */
@Entity({ name: 'follow' })
@ObjectType({
  description: '팔로우',
})
export class FollowEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user1_id',
    comment: '팔로우하는 유저 고유 ID',
  })
  @Field(() => String, {
    description: '팔로우하는 유저 고유 ID',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user1Id: string;

  // 서버 킬 때마다 주석했다, 풀었다 해야하는지?
  @Column({
    type: 'uuid',
    name: 'user2_id',
    comment: '팔로잉하는 유저 고유 ID',
  })
  @Field(() => String, {
    description: '팔로잉하는 유저 고유 ID',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user2Id: string;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user1_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '팔로우하는 user',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user1: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user2_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '팔로우하는 user',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user2: UserEntity;
}
