import { Field, ObjectType } from '@nestjs/graphql';
import { BoardAndUserOutput } from '@src/apis/board/dto/boardAndUser.output';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class PicksWithBoardOutput {
  @Field(() => String)
  id: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => BoardAndUserOutput)
  board: BoardAndUserOutput;
}
