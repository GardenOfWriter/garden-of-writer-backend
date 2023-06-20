import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'follow_count' })
@ObjectType()
export class FollowCountEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'userId',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '유저 ID',
  })
  userId: string;

  @Column({
    name: 'follow_count',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '팔로우 총 수',
  })
  @Field(() => Int, {
    description: '팔로우 총 수',
  })
  followCount: number;

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

  @OneToOne(() => UserEntity, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;
}
