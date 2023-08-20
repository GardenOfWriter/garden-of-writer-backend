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
    description: '닉네임',
  })
  nickname: string;

  @Field(() => String, { nullable: true, description: '휴대폰번호' })
  phoneNumber: string;

  @Field(() => String, { nullable: true, description: '포트폴리오' })
  portfolio: string;
}
