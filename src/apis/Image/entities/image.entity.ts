import { Field, ObjectType } from '@nestjs/graphql';
import { FictionBoard } from 'src/apis/fiction_board/entities/fiction_board.entity';
import { User } from 'src/apis/user/entities/user.entity';
// import { Board } from 'src/apis/boards/entities/board.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imgUrl: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => FictionBoard, { onDelete: 'CASCADE' })
  @Field(() => FictionBoard)
  fictionBoard: FictionBoard;

  // @OneToOne(() => Board)
  // @Field(() => Board)
  // board: Board;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
