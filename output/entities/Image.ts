import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { FictionBoard } from './FictionBoard';
import { User } from './User';

@Entity('image', { schema: 'garden_of_writer' })
export class Image {
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

  @Column('character varying', { name: 'img_url', length: 255 })
  imgUrl: string;

  @ManyToOne(() => FictionBoard, (fictionBoard) => fictionBoard.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  fictionBoard: FictionBoard;

  @OneToOne(() => User, (user) => user.image, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_2: User;

  @OneToOne(() => User, (user) => user.image_2)
  user: User;
}
