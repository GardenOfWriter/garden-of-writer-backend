import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class AttendListAndUser {
  id: string;

  user: User;
}
