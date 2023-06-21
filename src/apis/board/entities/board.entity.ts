import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'board' })
@ObjectType({
  description: '게시글',
})
export class BoardEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  @Field(() => String, {
    description: '유저 고유 ID',
  })
  userId: string;

  @Column({
    type: 'varchar',
    name: 'title',
    length: 255,
    comment: '제목',
  })
  @Field(() => String, {
    description: '제목',
  })
  title: string;

  @Column({
    type: 'text',
    name: 'content',
    comment: '본문 ',
  })
  @Field(() => String, {
    description: '본문',
  })
  content: string;

  @Column({
    type: 'int',
    name: 'like_count',
    unsigned: true,
    default: 0,
    comment: '좋아요 수',
  })
  @Field(() => Int, {
    description: '좋아요 수',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
  })
  likeCount: number;

  @Column({
    type: 'int',
    name: 'pick_count',
    comment: '찜 수',
    unsigned: true,
    default: 0,
  })
  @Field(() => Int, {
    description: '찜 수',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
  })
  pickCount: number;

  @Column('varchar', {
    name: 'tag',
    length: 255,
    comment: '태그',
  })
  @Field(() => String, {
    description: '태그',
    deprecationReason: '설계오류로 인해 제거되거나 확장 될 예정',
  })
  tag: string;

  @Column('text', {
    name: 'image',
    nullable: true,
    comment: '이미지',
  })
  @Field(() => String, {
    description: '이미지 버퍼',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
    nullable: true,
  })
  image: string | null;

  @ManyToOne(() => UserEntity, (user) => user.boards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '게시글 작성한 유저',
  })
  user: UserEntity;

  @OneToMany(() => PickEntity, (pick) => pick.board)
  @Field(() => [PickEntity], {
    description: '게시글 찜 목록',
  })
  picks: PickEntity[];
}
