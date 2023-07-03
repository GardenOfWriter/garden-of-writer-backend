import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'entities/base.entity';
import { NovelEntity } from 'entities/novel.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'novel_character' })
@ObjectType({
  description: '소설 캐릭터',
})
export class NovelCharacterEntity extends BaseEntity {
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
    type: 'varchar',
    length: '255',
    name: 'role',
    comment: '캐릭터 역할',
  })
  @Field(() => String, {
    description: '캐릭터 역할',
  })
  role: string;

  @Column({
    type: 'varchar',
    length: '255',
    name: 'name',
    comment: '캐릭터 이름',
  })
  @Field(() => String, {
    description: '캐릭터 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '255',
    name: 'description',
    comment: '캐릭터 설명',
  })
  @Field(() => String, {
    description: '캐릭터 설명',
  })
  description: string;

  @ManyToOne(() => NovelEntity, (novel) => novel.novelCharacters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'novel_id', referencedColumnName: 'id' }])
  @Field(() => NovelEntity, {
    description: '소설',
  })
  novel: NovelEntity;
}
