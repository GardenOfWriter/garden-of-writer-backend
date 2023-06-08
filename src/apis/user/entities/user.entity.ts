import { Field, ObjectType } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true }) // 중복해제(2단계 인증 느낌?)
  @Field(() => String)
  nickname: string;

  @Column({ unique: true }) // 중복해제(2단계 인증 느낌?)
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @Field(() => ImageEntity, { nullable: true })
  @OneToOne(() => ImageEntity, { nullable: true })
  image: ImageEntity;
}
