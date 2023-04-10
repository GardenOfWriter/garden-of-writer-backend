import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => [String])
  tag: string[];
}
