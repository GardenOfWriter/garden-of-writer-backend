import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  age: string;

  @Field({ nullable: true })
  gender: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field({ nullable: true })
  phone_number: string;
}
