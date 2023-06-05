import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FollowCount {
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
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
