import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelChapterCommentEntity } from 'entities/novel-chapter-comment.entity';
import { NovelCommentEntity } from 'entities/novel-comment.entity';
import { NovelLikeEntity } from 'entities/novel-like.entity';
import { NovelRecruitEntity } from 'entities/novel-recruit.entity';
import { NovelTagEntity } from 'entities/novel-tag.entity';
import { NovelWriterEntity } from 'entities/novel-writer.entity';
import { NovelUserLink } from 'entities/user-novel-link.entity';
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

  @OneToMany(() => NovelUserLink, (novelUserLink) => novelUserLink.user)
  @Field(() => [NovelUserLink], {
    description: '유저 소설 링크',
  })
  novelUserLinks: NovelUserLink[];

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

  @OneToMany(() => NovelRecruitEntity, (novelRecruit) => novelRecruit.user)
  @Field(() => [NovelRecruitEntity], {
    description: '소설 모집 리스트',
  })
  novelRecruits: NovelRecruitEntity[];

  @OneToMany(() => NovelCommentEntity, (novelComment) => novelComment.user)
  @Field(() => [NovelCommentEntity], {
    description: '소설 댓글 리스트',
  })
  novelComments: NovelCommentEntity[];

  @OneToMany(
    () => NovelChapterCommentEntity,
    (novelChapterComment) => novelChapterComment.user,
  )
  @Field(() => [NovelChapterCommentEntity], {
    description: '소설 챕터 댓글 리스트',
  })
  novelChapterComments: NovelChapterCommentEntity[];
}
