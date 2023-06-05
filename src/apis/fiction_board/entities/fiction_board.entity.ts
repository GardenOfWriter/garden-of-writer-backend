import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from '@src/apis/Image/entities/image.entity';
import { AttendList } from '@src/apis/attend_list/entities/attend_list.entity';
import { Pick } from '@src/apis/pick/entities/pick.entity';
import { Tag } from '@src/apis/tag/entities/tag.entity';
import { User } from '@src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FictionBoard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column({ default: 0 })
  @Field(() => Int)
  pickCount: number;

  @Column({ nullable: true })
  @Field(() => String)
  thumbnail: string;

  // @Column()
  // @Field(() => Int)
  // rating: number;

  @Column()
  @Field(() => String)
  genre: string;

  @Column({ default: 1 })
  @Field(() => Int)
  attend_count: number;

  @Column({ nullable: true })
  @Field(() => String)
  notice: string;

  @Column()
  @Field(() => String)
  deadline: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.fictionBoards)
  tags: Tag[];

  @OneToMany(() => AttendList, (attendList) => attendList.fictionBoard, {
    cascade: true,
  })
  @Field(() => [AttendList])
  attendList: AttendList[];

  @OneToMany(() => Image, (Image) => Image.fictionBoard, { cascade: true })
  @Field(() => [Image])
  image: Image[];

  @OneToMany(() => Pick, (pick) => pick.board, { cascade: true })
  @Field(() => [Pick])
  pick: Pick[];
}
