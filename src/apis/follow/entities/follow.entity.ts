import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 * @todo 필드명 변경
 */
@Entity({ name: 'follow' })
@ObjectType()
export class FollowEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user1Id',
    comment: '팔로우하는 유저 ID',
  })
  @Field(() => String, {
    description: '팔로우하는 유저 ID',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user1Id: string;

  @Column({
    type: 'uuid',
    name: 'user2Id',
    comment: '팔로잉하는 유저 ID',
  })
  @Field(() => String, {
    description: '팔로잉하는 유저 ID',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user2Id: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => UserEntity, {
    description: '팔로우하는 user',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user1: UserEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => UserEntity, {
    description: '팔로잉하는 user',
    deprecationReason: '필드명이 변경 될 예정입니다.',
  })
  user2: UserEntity;
}
