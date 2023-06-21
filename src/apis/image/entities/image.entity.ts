import { Field, ObjectType } from '@nestjs/graphql';
// import { Board } from '@src/apis/board/entities/board.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'image' })
@ObjectType({
  description: '이미지',
})
export class ImageEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: '유저 고유 ID',
  })
  @Field(() => String, {
    description: '유저 고유 ID',
  })
  userId: string;

  @Column({
    type: 'uuid',
    name: 'fiction_board_id',
    comment: '소설 고유 ID',
  })
  @Field(() => String, {
    description: '소설 고유 ID',
  })
  fictionBoardId: string;

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

  @OneToOne(() => UserEntity, (user) => user.image, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => UserEntity, {
    description: '유저',
  })
  user: UserEntity;

  @ManyToOne(() => FictionBoardEntity, (fictionBoard) => fictionBoard.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'fiction_board_id', referencedColumnName: 'id' }])
  @Field(() => FictionBoardEntity, {
    description: '소설',
  })
  fictionBoard: FictionBoardEntity;

  // @OneToOne(() => Board)
  // @Field(() => Board)
  // board: Board;
}
