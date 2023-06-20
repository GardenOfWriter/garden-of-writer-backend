import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'attend_list' })
@ObjectType()
export class AttendListEntity extends BaseEntity {
  @ManyToOne(() => FictionBoardEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => FictionBoardEntity, {})
  fictionBoard: FictionBoardEntity;

  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => UserEntity)
  user: UserEntity;
}
