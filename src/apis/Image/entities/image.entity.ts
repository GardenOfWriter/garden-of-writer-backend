import { Field, ObjectType } from '@nestjs/graphql';
// import { Board } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'image' })
@ObjectType()
export class ImageEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 ID',
  })
  @Field(() => String, {
    description: '유저 ID',
  })
  userId: string;

  @Column({
    name: 'img_url',
    type: 'varchar',
    length: '255',
    comment: '이미지 url',
  })
  @Field(() => String, {
    description: '이미지 url',
  })
  imgUrl: string;

  @ManyToOne(() => FictionBoardEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => FictionBoardEntity)
  fictionBoard: FictionBoardEntity;

  // @OneToOne(() => Board)
  // @Field(() => Board)
  // board: Board;

  @OneToOne(() => UserEntity, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;
}
