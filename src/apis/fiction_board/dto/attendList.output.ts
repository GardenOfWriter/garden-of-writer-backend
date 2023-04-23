import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardAndList {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  attendCount: string;

  @Field(() => Int)
  pickCount: number;

  @Field(() => String)
  appointment: string;
}
