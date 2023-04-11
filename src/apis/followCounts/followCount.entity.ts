import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';

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
