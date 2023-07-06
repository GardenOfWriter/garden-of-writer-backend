import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('follow', { schema: 'garden_of_writer' })
export class Follow {
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

  @ManyToOne(() => User, (user) => user.follows, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user1_id', referencedColumnName: 'id' }])
  user1: User;

  @ManyToOne(() => User, (user) => user.follows2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user2_id', referencedColumnName: 'id' }])
  user2: User;
}
