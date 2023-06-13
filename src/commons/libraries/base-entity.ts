import { Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '고유 ID',
  })
  @Field(() => String, {
    description: '고유 ID',
  })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일자',
  })
  @Field(() => Date, {
    description: '생성일자',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일자',
  })
  @Field(() => Date, {
    description: '수정일자',
  })
  updatedAt: Date;
}
