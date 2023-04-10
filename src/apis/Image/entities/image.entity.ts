import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
// import { Board } from 'src/apis/boards/entities/board.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
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

  // @OneToOne(() => Board)
  // @Field(() => Board)
  // board: Board;

  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
