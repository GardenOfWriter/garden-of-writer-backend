import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FictionBoard } from './FictionBoard';
import { User } from './User';

@Entity('attend_list', { schema: 'garden_of_writer' })
export class AttendList {
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

  @ManyToOne(() => FictionBoard, (fictionBoard) => fictionBoard.attendLists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  fictionBoard: FictionBoard;

  @ManyToOne(() => User, (user) => user.attendLists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
