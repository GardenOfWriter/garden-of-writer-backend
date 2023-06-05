import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class FollowerList {
  @Field()
  id: string;

  @Field(() => User)
  user1: User;
}
