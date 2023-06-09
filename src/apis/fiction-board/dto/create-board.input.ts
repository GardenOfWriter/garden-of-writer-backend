import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFictionBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  genre: string;

  @Field(() => String, { nullable: true })
  notice: string;

  @Field(() => String)
  deadline: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => [String], { nullable: true })
  tag: string[];
}
