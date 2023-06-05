import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { User } from '@src/apis/user/entities/user.entity';
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
export class AttendList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => FictionBoard, { onDelete: 'CASCADE' })
  @Field(() => FictionBoard)
  fictionBoard: FictionBoard;

  @JoinTable()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
