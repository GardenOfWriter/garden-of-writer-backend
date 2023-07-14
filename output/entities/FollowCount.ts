import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity('follow_count', { schema: 'garden_of_writer' })
export class FollowCount {
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

  @Column('integer', { name: 'follower_count', default: () => '0' })
  followerCount: number;

  @Column('integer', { name: 'following_count', default: () => '0' })
  followingCount: number;

  @OneToOne(() => User, (user) => user.followCount, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
