import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelCategoryLinkEntity } from 'entities/novel-category-link.entity';
import { NovelChapterEntity } from 'entities/novel-chapter.entity';
import { NovelCharacterEntity } from 'entities/novel-character.entity';
import { NovelCommentEntity } from 'entities/novel-comment.entity';
import { NovelLikeEntity } from 'entities/novel-like.entity';
import { NovelRecruitEntity } from 'entities/novel-recruit.entity';
import { NovelTagEntity } from 'entities/novel-tag.entity';
import { NovelWriterEntity } from 'entities/novel-writer.entity';
import { NovelUserLink } from 'entities/user-novel-link.entity';
import { Column, Entity, OneToMany } from 'typeorm';

/**
 * @todo 기획과 논의
 * @todo 논의에 따라 게시일 필요한지
 */
enum NovelStatus {
  Writing = 'writing',
  Posting = 'posting',
}

@Entity({ name: 'novel' })
@ObjectType({
  description: '소설',
})
export class NovelEntity extends BaseEntity {
  @Column({
    type: 'int',
    unsigned: true,
    name: 'user_id',
    comment: '유저 고유 ID (소설 소유자)',
  })
  @Field(() => Number, {
    description: '소설 소유자 고유 ID (유저 고유ID 입니다.)',
  })
  userId: number;

  /**
   * @todo 기획과 논의
   */
  @Column({
    type: 'enum',
    name: 'status',
    comment: '소설 상태',
    enum: NovelStatus,
  })
  @Field(() => NovelStatus, {
    description: '소설 상태 (기획파트와 논의 후 변경될 수 있습니다)',
  })
  status: NovelStatus;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'personnel',
    comment: '작가 참석 정원',
  })
  @Field(() => Number, {
    description: '작가 참석 정원',
  })
  personnel: number;

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
    type: 'varchar',
    length: '255',
    name: 'introduce',
    comment: '한줄 소개',
  })
  @Field(() => String, {
    description: '한줄 소개',
  })
  introduce: string;

  /**
   * @todo 필요에 따라 varchar 로 변경
   */
  @Column({
    type: 'text',
    name: 'summary',
    nullable: true,
    comment: '줄거리',
  })
  @Field(() => String, {
    nullable: true,
    description: '줄거리',
  })
  summary: string | null;

  @Column({
    type: 'text',
    name: 'recruit_description',
    comment: '작가 모집 본문',
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: '작가 모집 본문',
  })
  recruitDescription: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    name: 'like_count',
    comment: '좋아요 개수',
  })
  @Field(() => Int, {
    description: '좋아요 개수',
  })
  likeCount: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    name: 'hit',
    comment: '조회수',
  })
  @Field(() => Int, {
    description: '조회수',
  })
  hit: number;

  @OneToMany(() => NovelUserLink, (novelUserLink) => novelUserLink.novel)
  @Field(() => [NovelUserLink], {
    description: '유저 소설 링크',
  })
  novelUserLinks: NovelUserLink[];

  @OneToMany(() => NovelTagEntity, (novelTag) => novelTag.novel)
  @Field(() => [NovelTagEntity], {
    description: '소설 태그',
  })
  novelTags: NovelTagEntity[];

  @OneToMany(() => NovelLikeEntity, (novelLike) => novelLike.novel)
  @Field(() => [NovelLikeEntity], {
    description: '소설 좋아요 링크',
  })
  novelLikes: NovelLikeEntity[];

  @OneToMany(
    () => NovelCategoryLinkEntity,
    (novelCategoryLink) => novelCategoryLink.novel,
  )
  @Field(() => [NovelCategoryLinkEntity], {
    description: '소설 카테고리 링크 리스트',
  })
  novelCategoryLinks: NovelCategoryLinkEntity[];

  @OneToMany(() => NovelWriterEntity, (novelWriter) => novelWriter.novel)
  @Field(() => [NovelWriterEntity], {
    description: '소설 작성자 리스트',
  })
  novelWriters: NovelWriterEntity[];

  @OneToMany(() => NovelRecruitEntity, (novelRecruit) => novelRecruit.novel)
  @Field(() => [NovelRecruitEntity], {
    description: '소설 모집 리스트',
  })
  novelRecruits: NovelRecruitEntity[];

  @OneToMany(
    () => NovelCharacterEntity,
    (novelCharacter) => novelCharacter.novel,
  )
  @Field(() => [NovelCharacterEntity], {
    description: '소설 캐릭터 리스트',
  })
  novelCharacters: NovelCharacterEntity[];

  @OneToMany(() => NovelChapterEntity, (novelChapter) => novelChapter.novel)
  @Field(() => [NovelChapterEntity], {
    description: '소설 챕터 리스트',
  })
  novelChapters: NovelChapterEntity[];

  @OneToMany(() => NovelCommentEntity, (novelComment) => novelComment.novel)
  @Field(() => [NovelCommentEntity], {
    description: '소설 댓글 리스트',
  })
  novelComments: NovelCommentEntity[];
}
