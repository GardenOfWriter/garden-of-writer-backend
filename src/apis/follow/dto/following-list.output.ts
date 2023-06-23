import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class FollowingListOutput {
  @Field()
  id: string;

  @Field(() => UserEntity)
  user2: UserEntity;
}
