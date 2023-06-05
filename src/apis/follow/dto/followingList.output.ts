import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class FollowingList {
  @Field()
  id: string;

  @Field(() => UserEntity)
  user2: UserEntity;
}
