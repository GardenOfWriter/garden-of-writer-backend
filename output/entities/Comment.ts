import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Board } from './Board';
import { FictionBoard } from './FictionBoard';
import { User } from './User';
import { NestedComment } from './NestedComment';

@Entity('comment', { schema: 'garden_of_writer' })
export class Comment {
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

  @Column('character varying', { name: 'content', length: 255 })
  content: string;

  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;

  @ManyToOne(() => FictionBoard, (fictionBoard) => fictionBoard.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  fictionBoard: FictionBoard;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => NestedComment, (nestedComment) => nestedComment.comment)
  nestedComments: NestedComment[];
}
