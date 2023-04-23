import { Field, ObjectType } from '@nestjs/graphql';
import { BoardAndUser } from 'src/apis/board/dto/boardAndUser.output';
import { User } from 'src/apis/user/entities/user.entity';

@ObjectType()
export class PicksWithBoard {
  @Field(() => String)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => BoardAndUser)
  board: BoardAndUser;
}
