import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'follow_count' })
@ObjectType({
  description: '팔로우 집계',
})
export class FollowCountEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  @Field(() => String, {
    description: '유저 고유 ID',
  })
  userId: string;

  @Column({
    name: 'follower_count',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '팔로워 총 수',
  })
  @Field(() => Int, {
    description: '팔로워 총 수',
  })
  followerCount: number;

  @Column({
    name: 'following_count',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '팔로잉 총 수',
  })
  @Field(() => Int, {
    description: '팔로잉 총 수',
  })
  followingCount: number;

  @OneToOne(() => UserEntity, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;
}
