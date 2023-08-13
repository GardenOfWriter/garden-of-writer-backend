import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: '이메일',
  })
  email: string;

  @Field(() => String, {
    description: '비밀번호',
  })
  password: string;

  @Field(() => String, {
    description: '비밀번호체크',
  })
  cPassword: string;

  @Field(() => String, {
    description: '닉네임',
  })
  nickname: string;

  @Field(() => String, { nullable: true })
  phone_number: string;

  @Field(() => String, { nullable: true })
  Portfolio: string;
}
