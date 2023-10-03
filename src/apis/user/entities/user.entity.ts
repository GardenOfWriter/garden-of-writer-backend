import { Field, ObjectType } from '@nestjs/graphql';
import { AttendListEntity } from '@src/apis/attend-list/entities/attend-list.entity';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { FollowEntity } from '@src/apis/follow/entities/follow.entity';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType({
  description: '유저',
})
export class UserEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'image_id',
    comment: '이미지 고유 ID',
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: '이미지 고유 ID',
    deprecationReason: '설계 오류로 인해 제거될 수 있습니다.',
  })
  imageId: string | null;

  @Column({
    name: 'nickname',
    unique: true,
    type: 'varchar',
    length: '255',
    comment: '닉네임',
  })
  @Field(() => String, {
    description: '닉네임',
  })
  nickname: string;

  @Column({
    name: 'email',
    unique: true,
    type: 'varchar',
    length: '255',
    comment: '이메일',
  })
  @Field(() => String, {
    description: '이메일',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '255',
    comment: '비밀번호',
  })
  password: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '255',
    unique: true,
    comment: '핸드폰 번호',
    nullable: true,
  })
  @Field(() => String, {
    description: '핸드폰 번호',
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    description: '포트폴리오',
  })
  portfolio: string;

  /**
   * @todo thumbnail 필드로 관리되도 좋을듯합니다.
   */
  @OneToOne(() => ImageEntity, (image) => image.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  @Field(() => ImageEntity, {
    description: '이미지',
    nullable: true,
    deprecationReason: '설계 오류로 인해 제거될 수 있습니다.',
  })
  image: ImageEntity | null;

  @OneToMany(() => AttendListEntity, (attendList) => attendList.user)
  @Field(() => [AttendListEntity], {
    description: '참석자 리스트',
  })
  attendLists: AttendListEntity[];

  @OneToMany(() => BoardEntity, (board) => board.user)
  @Field(() => [BoardEntity], {
    description: '게시글',
  })
  boards: BoardEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  @Field(() => [CommentEntity], {
    description: '댓글',
  })
  comments: CommentEntity[];

  @OneToMany(() => FictionBoardEntity, (fictionBoard) => fictionBoard.user)
  @Field(() => [FictionBoardEntity], {
    description: '소설',
  })
  fictionBoards: FictionBoardEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.user1)
  @Field(() => [CommentEntity], {
    description: '팔로워',
  })
  followers: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.user2)
  @Field(() => [CommentEntity], {
    description: '팔로잉',
  })
  followings: FollowEntity[];

  @OneToMany(
    () => NestedCommentEntity,
    (nestedCommentEntity) => nestedCommentEntity.user,
  )
  @Field(() => [NestedCommentEntity], {
    description: '대댓글',
  })
  nestedComments: NestedCommentEntity[];

  @OneToMany(() => PickEntity, (pick) => pick.user)
  @Field(() => [PickEntity], {
    description: '찜',
  })
  picks: PickEntity[];
}
