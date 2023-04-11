import { Field, ObjectType } from '@nestjs/graphql';
import { Follow } from 'src/apis/follow/entities/follow.entity';
import { Image } from 'src/apis/Image/entities/image.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field(() => String)
  age: string;

  @Column()
  @Field(() => String)
  phone_number: string;

  @Column()
  @Field(() => String)
  grade: string;

  @Column()
  @Field(() => String, { nullable: true })
  mbti: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, { nullable: true })
  image: Image;

  @JoinTable()
  @Field()
  @ManyToMany(() => Follow)
  follow: Follow[];
}
