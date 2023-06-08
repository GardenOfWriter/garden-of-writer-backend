import { Field, ObjectType } from '@nestjs/graphql';
// import { Board } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
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
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imgUrl: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => FictionBoardEntity, { onDelete: 'CASCADE' })
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;

  // @OneToOne(() => Board)
  // @Field(() => Board)
  // board: Board;

  @OneToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;
}
