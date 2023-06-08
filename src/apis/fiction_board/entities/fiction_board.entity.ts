import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/Image/entities/image.entity';
import { AttendListEntity } from '@src/apis/attend_list/entities/attend_list.entity';
import { FictionBoardTagLinkEntity } from '@src/apis/fiction_board/entities/fiction-board-tag-link.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fiction_board' })
@ObjectType()
export class FictionBoardEntity {
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

  @ManyToOne(() => UserEntity)
  @Field(() => UserEntity)
  user: UserEntity;

  @OneToMany(
    () => FictionBoardTagLinkEntity,
    (fictionBoardTagLinkEntity) => fictionBoardTagLinkEntity.fictionBoardId,
  )
  @Field(() => [FictionBoardTagLinkEntity], { nullable: true })
  fictionBoardTagLinks: FictionBoardTagLinkEntity[];

  @OneToMany(() => AttendListEntity, (attendList) => attendList.fictionBoard, {
    cascade: true,
  })
  @Field(() => [AttendListEntity])
  attendList: AttendListEntity[];

  @OneToMany(() => ImageEntity, (Image) => Image.fictionBoard, {
    cascade: true,
  })
  @Field(() => [ImageEntity])
  image: ImageEntity[];

  @OneToMany(() => PickEntity, (pick) => pick.board, { cascade: true })
  @Field(() => [PickEntity])
  pick: PickEntity[];
}
