import { Field, ObjectType } from '@nestjs/graphql';
import { BoardAndUser } from '@src/apis/board/dto/boardAndUser.output';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class PicksWithBoard {
  @Field(() => String)
  id: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => BoardAndUser)
  board: BoardAndUser;
}
