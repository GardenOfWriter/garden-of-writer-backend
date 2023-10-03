import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, {
    description: '닉네임',
  })
  nickname: string;
}
