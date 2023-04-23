import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pick } from 'src/apis/pick/entities/pick.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
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

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @Column()
  @Field(() => String)
  tag: string;

  @Column()
  @Field(() => String, { nullable: true })
  image: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @OneToMany(() => Pick, (pick) => pick.board, { cascade: true })
  @Field(() => [Pick])
  pick: Pick[];
}
