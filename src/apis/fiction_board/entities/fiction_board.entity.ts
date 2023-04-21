import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from 'src/apis/Image/entities/image.entity';
import { Tag } from 'src/apis/tag/entities/tag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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

  @Column()
  @Field(() => String)
  thumbnail: string;

  @Column()
  @Field(() => Int)
  mark: number;

  @Column()
  @Field(() => String)
  genre: string;

  @Column()
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

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.fictionBoards)
  users: User[];

  @JoinColumn()
  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, { nullable: true })
  image: Image;
}
