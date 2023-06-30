import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FictionBoard } from './FictionBoard';
import { Tag } from './Tag';

@Entity('fiction_board_tag_link', { schema: 'garden_of_writer' })
export class FictionBoardTagLink {
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

  @ManyToOne(
    () => FictionBoard,
    (fictionBoard) => fictionBoard.fictionBoardTagLinks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  fictionBoard: FictionBoard;

  @ManyToOne(() => Tag, (tag) => tag.fictionBoardTagLinks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}
