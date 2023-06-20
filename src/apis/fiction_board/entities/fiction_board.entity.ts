import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/Image/entities/image.entity';
import { AttendListEntity } from '@src/apis/attend_list/entities/attend_list.entity';
import { FictionBoardTagLinkEntity } from '@src/apis/fiction_board/entities/fiction-board-tag-link.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'fiction_board' })
@ObjectType()
export class FictionBoardEntity extends BaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    comment: '소설 제목',
  })
  @Field(() => String, {
    description: '소설 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    comment: '소설 본문',
  })
  @Field(() => String, {
    description: '소설 본문',
  })
  content: string;

  @Column({
    name: 'like',
    type: 'int',
    unsigned: true,
    default: 0,
    comment: '소설 좋아요 수',
  })
  @Field(() => Int, {
    description: '소설 좋아요 수',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
  })
  like: number;

  @Column({
    name: 'pick_count',
    type: 'int',
    default: 0,
    unsigned: true,
    comment: '소설 찜 수',
  })
  @Field(() => Int, {
    description: '소설 찜 수',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
  })
  pickCount: number;

  @Column({
    name: 'thumbnail',
    type: 'text',
    nullable: true,
    comment: '소설 썸네일',
  })
  @Field(() => String, {
    description: '소설 썸네일 버퍼',
    deprecationReason: '설계 오류로 인해 제거되거나 확장 될 예정',
    nullable: true,
  })
  thumbnail: string | null;

  // @Column()
  // @Field(() => Int)
  // rating: number;

  @Column({
    name: 'genre',
    type: 'varchar',
    length: '255',
    comment: '장르',
  })
  @Field(() => String, {
    description: '장르',
  })
  genre: string;

  @Column({
    name: 'attend_count',
    unsigned: true,
    default: 1,
    type: 'int',
    comment: '참석자 수',
  })
  @Field(() => Int, {
    description: '참석자 수',
  })
  attendCount: number;

  @Column({
    name: 'notice',
    type: 'text',
    nullable: true,
    comment: '소설 공지사항',
  })
  @Field(() => String, {
    nullable: true,
    description: '소설 공지사항',
  })
  notice: string | null;

  /**
   * 왜 string??
   */
  @Column({
    name: 'deadline',
    type: 'varchar',
    length: '255',
    comment: '마감일',
  })
  @Field(() => String, {
    description: '마감일',
    deprecationReason: 'deprecated 되진않지만 타입이 변경될 수 있습니다.',
  })
  deadline: string;

  /**
   * @todo 여럿이서 쓰니 변경돼야할수도있음
   */
  @ManyToOne(() => UserEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => UserEntity, {
    description: '소설 작성자',
    deprecationReason: '설계오류로 인해 변경 될 가능성이 있습니다.',
  })
  user: UserEntity;

  @OneToMany(
    () => FictionBoardTagLinkEntity,
    (fictionBoardTagLinkEntity) => fictionBoardTagLinkEntity.fictionBoardId,
  )
  @Field(() => [FictionBoardTagLinkEntity], {
    description: '소설의 태그 리스트',
  })
  fictionBoardTagLinks: FictionBoardTagLinkEntity[];

  @OneToMany(() => AttendListEntity, (attendList) => attendList.fictionBoard)
  @Field(() => [AttendListEntity], {
    description: '참석자 리스트',
  })
  attendLists: AttendListEntity[];

  @OneToMany(() => ImageEntity, (Image) => Image.fictionBoard)
  @Field(() => [ImageEntity], {
    description: '이미지 리스트',
  })
  images: ImageEntity[];

  @OneToMany(() => PickEntity, (pick) => pick.board, { cascade: true })
  @Field(() => [PickEntity], {
    description: '찜한 목록',
  })
  picks: PickEntity[];
}
