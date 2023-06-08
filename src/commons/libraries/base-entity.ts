import { Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '고유 ID',
  })
  @Field(() => String)
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일자',
  })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일자',
  })
  @Field(() => Date)
  updatedAt: Date;
}
