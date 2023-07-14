import { Column, Entity, OneToMany } from 'typeorm';
import { FictionBoardTagLink } from './FictionBoardTagLink';

@Entity('tag', { schema: 'garden_of_writer' })
export class Tag {
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

  @OneToMany(
    () => FictionBoardTagLink,
    (fictionBoardTagLink) => fictionBoardTagLink.tag,
  )
  fictionBoardTagLinks: FictionBoardTagLink[];
}
