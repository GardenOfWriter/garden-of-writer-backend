import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class BoardAndUser {
  @Field(() => String)
  title: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  dateTime: string;

  @Field(() => Int)
  dues: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => User)
  user: User;

  @Field(() => Int, { nullable: true })
  pickCount: number;

  @Field(() => [User])
  pickUsers: User[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
