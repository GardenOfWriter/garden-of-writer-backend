import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  cPassword: string;

  @Field()
  gender: string;

  @Field()
  age: string;

  @Field(() => String)
  phone_number: string;

  @Field(() => String, { nullable: true })
  image: string;
}
