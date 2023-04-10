import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoard } from 'src/apis/fiction_board/entities/fiction_board.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @JoinTable()
  @ManyToMany(() => FictionBoard)
  @Field(() => [FictionBoard])
  fictionBoards: FictionBoard[];
}
