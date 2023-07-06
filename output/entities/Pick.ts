import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Board } from './Board';
import { FictionBoard } from './FictionBoard';
import { User } from './User';

@Entity('pick', { schema: 'garden_of_writer' })
export class Pick {
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

  @ManyToOne(() => Board, (board) => board.picks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;

  @ManyToOne(() => FictionBoard, (fictionBoard) => fictionBoard.picks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  fictionBoard: FictionBoard;

  @ManyToOne(() => User, (user) => user.picks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
