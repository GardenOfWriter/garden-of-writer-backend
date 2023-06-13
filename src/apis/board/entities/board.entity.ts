import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'board' })
@ObjectType()
export class BoardEntity extends BaseEntity {
  @Column('varchar', {
    name: 'title',
    length: 255,
    comment: '제목',
  })
  @Field(() => String, {
    description: '제목',
  })
  title: string;

  @Column('text', {
    name: 'content',
    comment: '본문 ',
  })
  @Field(() => String, {
    description: '본문',
  })
  content: string;

  @Column('int', {
    name: 'like',
    comment: '',
    unsigned: true,
    default: 0,
  })
  @Field(() => Int, {
    description: '좋아요 수',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
  })
  like: number;

  @Column('int', {
    name: 'pick_count',
    comment: '',
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

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => UserEntity, {
    description: '게시글 작성한 유저',
  })
  user: UserEntity;

  @OneToMany(() => PickEntity, (pick) => pick.board, { cascade: true })
  @Field(() => [PickEntity], {
    description: '게시글 찜 목록',
  })
  picks: PickEntity[];
}
