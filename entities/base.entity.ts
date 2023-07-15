import { Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '고유 id',
    unsigned: true,
  })
  @Field(() => Number, {
    description: '고유 ID',
  })
  id: number;

  @Column({
    type: 'timestamptz',
    default: () => 'now()',
    name: 'created_at',
    comment: '생성일자',
  })
  @Field(() => Date, {
    description: '생성일자',
  })
  createdAt: Date;

  /**
   * update 시 값 바뀌는지 확인 필요
   */
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    comment: '수정일자',
  })
  @Field(() => Date, {
    description: '수정일자',
  })
  updatedAt: Date;
}
