import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'follow' })
@ObjectType()
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user1: UserEntity;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity)
  user2: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
