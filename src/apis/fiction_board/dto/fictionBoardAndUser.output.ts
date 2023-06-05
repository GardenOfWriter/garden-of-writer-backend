import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class BoardAndUser {
  @Field(() => String)
  title: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  dateTime: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => [UserEntity])
  pickUsers: UserEntity[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
