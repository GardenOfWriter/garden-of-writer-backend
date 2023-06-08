import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @JoinTable()
  @ManyToMany(() => FictionBoardEntity)
  @Field(() => [FictionBoardEntity])
  fictionBoards: FictionBoardEntity[];
}
