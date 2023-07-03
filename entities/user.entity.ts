import { Field, ObjectType } from '@nestjs/graphql';
import { AttendListEntity } from '@src/apis/attend-list/entities/attend-list.entity';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { FollowEntity } from '@src/apis/follow/entities/follow.entity';
import { NestedCommentEntity } from '@src/apis/nested-comment/entities/nested-comment.entity';
import { PickEntity } from '@src/apis/pick/entities/pick.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { NovelChapterCommentEntity } from 'entities/novel-chapter-comment.entity';
import { NovelCommentEntity } from 'entities/novel-comment.entity';
import { NovelLikeEntity } from 'entities/novel-like.entity';
import { NovelRecruitEntity } from 'entities/novel-recruit.entity';
import { NovelTagEntity } from 'entities/novel-tag.entity';
import { NovelWriterEntity } from 'entities/novel-writer.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType({
  description: '유저',
})
export class UserEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    comment: '이름',
  })
  @Field(() => String, {
    description: '이름',
  })
  name: string;

  // 중복해제(2단계 인증 느낌?)
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

  /**
   * Oauth 적용 시 nullable 하게 변경
   */
  @Column({
    name: 'password',
    type: 'varchar',
    length: '255',
    comment: '해시된 비밀번호',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: '255',
    name: 'thumbnail_url',
    comment: '썸네일 url',
    nullable: true,
    unique: true,
  })
  @Field(() => String, {
    nullable: true,
    description: '썸네일 url',
  })
  thumbnailUrl: string | null;

  @OneToMany(() => NovelLikeEntity, (novelLike) => novelLike.user)
  @Field(() => [NovelLikeEntity], {
    description: '소설 좋아요 링크',
  })
  novelLikes: NovelLikeEntity[];

  @OneToMany(() => NovelTagEntity, (novelTag) => novelTag.user)
  @Field(() => [NovelTagEntity], {
    description: '소설 태그 링크',
  })
  novelTags: NovelTagEntity[];

  @OneToMany(() => NovelWriterEntity, (novelWriter) => novelWriter.user)
  @Field(() => [NovelWriterEntity], {
    description: '소설 작성자 리스트',
  })
  novelWriters: NovelWriterEntity[];

  @OneToMany(() => NovelRecruitEntity, (novelAttend) => novelAttend.user)
  @Field(() => [NovelRecruitEntity], {
    description: '소설 모집 리스트',
  })
  novelRecruits: NovelRecruitEntity[];

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

  @OneToMany(() => NovelCommentEntity, (novelComment) => novelComment.user)
  @Field(() => [NovelCommentEntity], {
    description: '찜',
  })
  novelComments: NovelCommentEntity[];

  @OneToMany(
    () => NovelChapterCommentEntity,
    (novelChapterComment) => novelChapterComment.user,
  )
  @Field(() => [NovelChapterCommentEntity], {
    description: '찜',
  })
  novelChapterComments: NovelChapterCommentEntity[];
}
