import { ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

@ObjectType()
export class AttendListAndUserOutput {
  id: string;

  user: UserEntity;
}
