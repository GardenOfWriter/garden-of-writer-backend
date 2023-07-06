import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AttendList } from './AttendList';
import { Board } from './Board';
import { Comment } from './Comment';
import { FictionBoard } from './FictionBoard';
import { Follow } from './Follow';
import { FollowCount } from './FollowCount';
import { Image } from './Image';
import { NestedComment } from './NestedComment';
import { Pick } from './Pick';

@Index('UQ_e12875dfb3b1d92d7d7c5377e22', ['email'], { unique: true })
@Index('UQ_e2364281027b926b879fa2fa1e0', ['nickname'], { unique: true })
@Index('UQ_01eea41349b6c9275aec646eee0', ['phoneNumber'], { unique: true })
@Entity('user', { schema: 'garden_of_writer' })
export class User {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'nickname', unique: true, length: 255 })
  nickname: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('character varying', { name: 'gender', length: 255 })
  gender: string;

  @Column('character varying', { name: 'age', length: 255 })
  age: string;

  @Column('character varying', {
    name: 'phone_number',
    unique: true,
    length: 255,
  })
  phoneNumber: string;

  @OneToMany(() => AttendList, (attendList) => attendList.user)
  attendLists: AttendList[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => FictionBoard, (fictionBoard) => fictionBoard.user)
  fictionBoards: FictionBoard[];

  @OneToMany(() => Follow, (follow) => follow.user1)
  follows: Follow[];

  @OneToMany(() => Follow, (follow) => follow.user2)
  follows2: Follow[];

  @OneToOne(() => FollowCount, (followCount) => followCount.user)
  followCount: FollowCount;

  @OneToOne(() => Image, (image) => image.user_2)
  image: Image;

  @OneToMany(() => NestedComment, (nestedComment) => nestedComment.user)
  nestedComments: NestedComment[];

  @OneToMany(() => Pick, (pick) => pick.user)
  picks: Pick[];

  @OneToOne(() => Image, (image) => image.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image_2: Image;
}
