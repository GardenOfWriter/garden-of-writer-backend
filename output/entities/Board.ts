import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Pick } from './Pick';

@Entity('board', { schema: 'garden_of_writer' })
export class Board {
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

  @Column('character varying', { name: 'tag', length: 255 })
  tag: string;

  @Column('text', { name: 'image', nullable: true })
  image: string | null;

  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @OneToMany(() => Pick, (pick) => pick.board)
  picks: Pick[];
}
