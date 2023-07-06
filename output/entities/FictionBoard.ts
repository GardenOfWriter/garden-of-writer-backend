import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AttendList } from './AttendList';
import { Comment } from './Comment';
import { User } from './User';
import { FictionBoardTagLink } from './FictionBoardTagLink';
import { Image } from './Image';
import { Pick } from './Pick';

@Entity('fiction_board', { schema: 'garden_of_writer' })
export class FictionBoard {
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

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('integer', { name: 'like_count', default: () => '0' })
  likeCount: number;

  @Column('integer', { name: 'pick_count', default: () => '0' })
  pickCount: number;

  @Column('character varying', {
    name: 'thumbnail',
    nullable: true,
    length: 255,
  })
  thumbnail: string | null;

  @Column('character varying', { name: 'genre', length: 255 })
  genre: string;

  @Column('integer', { name: 'attend_count', default: () => '1' })
  attendCount: number;

  @Column('text', { name: 'notice', nullable: true })
  notice: string | null;

  @Column('character varying', { name: 'deadline', length: 255 })
  deadline: string;

  @OneToMany(() => AttendList, (attendList) => attendList.fictionBoard)
  attendLists: AttendList[];

  @OneToMany(() => Comment, (comment) => comment.fictionBoard)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.fictionBoards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => FictionBoardTagLink,
    (fictionBoardTagLink) => fictionBoardTagLink.fictionBoard,
  )
  fictionBoardTagLinks: FictionBoardTagLink[];

  @OneToMany(() => Image, (image) => image.fictionBoard)
  images: Image[];

  @OneToMany(() => Pick, (pick) => pick.fictionBoard)
  picks: Pick[];
}
