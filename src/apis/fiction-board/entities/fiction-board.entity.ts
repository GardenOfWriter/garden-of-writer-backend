import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttendListEntity } from '@src/apis/attend-list/entities/attend-list.entity';
import { FictionBoardTagLinkEntity } from '@src/apis/fiction-board/entities/fiction-board-tag-link.entity';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'fiction_board' })
@ObjectType({
  description: '소설',
})
export class FictionBoardEntity extends BaseEntity {
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
    length: '255',
    name: 'title',
    comment: '제목',
  })
  @Field(() => String, {
    description: '제목',
  })
  title: string;

  @Column({
    type: 'text',
    name: 'content',
    comment: '본문',
  })
  @Field(() => String, {
    description: '본문',
  })
  content: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    name: 'like_count',
    comment: '좋아요 개수',
  })
  @Field(() => Int, {
    description: '좋아요 개수',
    deprecationReason: '설계 오류로 인해 deprecated 될 수 있습니다.',
  })
  likeCount: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    name: 'pick_count',
    comment: '찜 개수',
  })
  @Field(() => Int, {
    description: '찜 개수',
    deprecationReason: '설계 오류로 인해 deprecated 될 수 있습니다.',
  })
  pickCount: number;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
    name: 'thumbnail',
    comment: '썸네일 url',
  })
  @Field(() => String, {
    nullable: true,
    description: '썸네일 url',
  })
  thumbnail: string | null;

  // @Column()
  // @Field(() => Int)
  // rating: number;

  /**
   * 장르가 제한한다면 테이블 하나 만들고 조인해서 쓰거나 enum 으로 관리
   */
  @Column({
    type: 'varchar',
    length: '255',
    name: 'genre',
    comment: '장르',
  })
  @Field(() => String, {
    description: '장르',
  })
  genre: string;

  @Column({
    type: 'int',
    default: 1,
    unsigned: true,
    name: 'attend_count',
    comment: '참석자 수',
  })
  @Field(() => Int, {
    description: '참석자 수',
    deprecationReason: '설계 오류로 인해 deprecated 될 수 있습니다.',
  })
  attendCount: number;

  @Column({
    type: 'text',
    nullable: true,
    name: 'notice',
    comment: '공지사항',
  })
  @Field(() => String, {
    nullable: true,
    description: '공지사항',
  })
  notice: string | null;

  /**
   * 왜 string??
   */
  @Column({
    type: 'varchar',
    length: '255',
    name: 'deadline',
    comment: '마감일',
  })
  @Field(() => String, {
    description: '마감일',
    deprecationReason: '설계 오류로인해 변경될 수 있습니다.',
  })
  deadline: string;

  @ManyToOne(() => UserEntity, (user) => user.fictionBoards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @OneToMany(() => AttendListEntity, (attendList) => attendList.fictionBoard)
  @Field(() => [AttendListEntity], {
    description: '참석자',
  })
  attendLists: AttendListEntity[];

  @OneToMany(
    () => FictionBoardTagLinkEntity,
    (fictionBoardTagLinkEntity) => fictionBoardTagLinkEntity.fictionBoardId,
  )
  @Field(() => [FictionBoardTagLinkEntity], {
    description: '소설 태그 링크',
  })
  fictionBoardTagLinks: FictionBoardTagLinkEntity[];

  @OneToMany(() => ImageEntity, (image) => image.fictionBoard)
  @Field(() => [ImageEntity], {
    description: '이미지',
  })
  images: ImageEntity[];

  @OneToMany(() => PickEntity, (pick) => pick.fictionBoard)
  @Field(() => [PickEntity], {
    description: '찜',
  })
  picks: PickEntity[];
}
