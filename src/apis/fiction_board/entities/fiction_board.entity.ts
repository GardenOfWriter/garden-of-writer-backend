import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttendList } from 'src/apis/attend_list/entities/attend_list.entity';
import { Image } from 'src/apis/Image/entities/image.entity';
import { Pick } from 'src/apis/pick/entities/pick.entity';
import { Tag } from 'src/apis/tag/entities/tag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column()
  @Field(() => String)
  thumbnail: string;

  @Column()
  @Field(() => Int)
  rating: number;

  @Column()
  @Field(() => String)
  genre: string;

  @Column({ default: 1 })
  @Field(() => Int)
  attend_count: number;

  @Column()
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
  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.fictionBoards)
  tags: Tag[];

  @OneToMany(() => AttendList, (attendList) => attendList.fictionBoard, {
    cascade: true,
  })
  @Field(() => [AttendList])
  attendList: AttendList[];

  @JoinColumn()
  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, { nullable: true })
  image: Image;

  @OneToMany(() => Pick, (pick) => pick.board, { cascade: true })
  @Field(() => [Pick])
  pick: Pick[];
}
