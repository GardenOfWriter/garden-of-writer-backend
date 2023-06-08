import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FollowCountEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ default: 0 })
  @Field(() => Int)
  followCount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  followerCount: number;

  @JoinColumn()
  @OneToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;
}
