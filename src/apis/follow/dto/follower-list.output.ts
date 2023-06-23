import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class FollowerListOutput {
  @Field()
  id: string;

  @Field(() => UserEntity)
  user1: UserEntity;
}
