import { Field, ObjectType } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { BaseEntity } from '@src/commons/libraries/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
@ObjectType()
export class UserEntity extends BaseEntity {
  @Column({
    type: 'uuid',
    name: 'image_id',
    comment: '이미지 ID',
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: '이미지 ID',
    deprecationReason: '설계 오류로 인해 제거될 수 있습니다.',
  })
  imageId: string | null;

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

  // 중복해제(2단계 인증 느낌?)
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

  // 중복해제(2단계 인증 느낌?)
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

  @Column({
    name: 'password',
    type: 'varchar',
    length: '255',
    comment: '비밀번호',
  })
  password: string;

  /**
   * @todo enum 으로 관리
   */
  @Column({
    name: 'gender',
    type: 'varchar',
    length: '255',
    comment: '성별',
  })
  @Field(() => String, {
    description: '성별',
    deprecationReason: 'deprecated 되진 않지만 enum 으로 관리될 예정입니다.',
  })
  gender: string;

  /**
   * 왜 string?
   */
  @Column({
    name: 'age',
    type: 'varchar',
    length: '255',
    comment: '나이',
  })
  @Field(() => String, {
    description: '나이',
    deprecationReason:
      'deprecated 되진 않지만 타입이 number 로 변경될 수 있습니다.',
  })
  age: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '255',
    unique: true,
    comment: '핸드폰 번호',
  })
  @Field(() => String, {
    description: '핸드폰 번호',
  })
  phoneNumber: string;

  /**
   * @todo thumbnail 필드로 관리되도 좋을듯합니다.
   */
  @OneToOne(() => ImageEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  @Field(() => ImageEntity, {
    description: '이미지',
    nullable: true,
    deprecationReason: '설계 오류로 인해 제거될 수 있습니다.',
  })
  image: ImageEntity | null;
}
