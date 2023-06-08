import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class AttendListEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => FictionBoardEntity, { onDelete: 'CASCADE' })
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;

  @JoinTable()
  @ManyToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;
}
