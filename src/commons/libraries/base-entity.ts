import { Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

export class BaseEntity {
  @Column({
    type: 'uuid',
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
    comment: '고유 ID',
  })
  @Field(() => String, {
    description: '고유 ID',
  })
  id: string;

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

  @Column({
    type: 'timestamptz',
    default: () => 'now()',
    name: 'updated_at',
    comment: '수정일자',
  })
  @Field(() => Date, {
    description: '수정일자',
  })
  updatedAt: Date;
}
