import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelChapterCommentEntity } from 'entities/novel-chapter-comment.entity';
import { NovelEntity } from 'entities/novel.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

/**
 * @todo 기획과 논의
 * @todo 논의에 따라 게시일 필요한지
 */
enum NovelChapterStatus {
  /** 작성중 */
  Writing = 'writing',
  /** 게시중 */
  Posting = 'posting',
}

@Entity({ name: 'novel_chapter' })
@ObjectType({
  description: '소설 챕터',
})
export class NovelChapterEntity extends BaseEntity {
  @Column({
    type: 'int',
    unsigned: true,
    name: 'novel_id',
    comment: '소설 고유 ID',
  })
  @Field(() => Number, {
    description: '소설 고유 ID',
  })
  novelId: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'no',
    comment: '소설 챕터 번호',
  })
  @Field(() => Number, {
    description: '소설 챕터 번호',
  })
  no: number;

  /**
   * @todo 기획과 논의
   */
  @Column({
    type: 'enum',
    name: 'status',
    comment: '소설 챕터 상태',
    enum: NovelChapterStatus,
  })
  @Field(() => NovelChapterStatus, {
    description: '소설 챕터 상태 (기획파트와 논의 후 변경될 수 있습니다)',
  })
  status: NovelChapterStatus;

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
    name: 'description',
    comment: '작가 모집 본문',
  })
  @Field(() => String, {
    description: '작가 모집 본문',
  })
  description: string;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelChapters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;

  @OneToMany(
    () => NovelChapterCommentEntity,
    (novelChapterComment) => novelChapterComment.novelChapter,
  )
  @Field(() => [NovelChapterCommentEntity], {
    description: '소설 챕터 댓글 리스트',
  })
  novelChapterComments: NovelChapterCommentEntity[];
}
