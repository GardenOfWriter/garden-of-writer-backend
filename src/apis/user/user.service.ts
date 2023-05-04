import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Image } from '../Image/entities/image.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/apis/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly mailService: MailService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findOne(type) {
    return await this.userRepository.findOne({
      where: type,
    });
  }

  //유저찾기
  async findUser({ userId }) {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  //나 찾기
  async findMe({ userId }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['image'],
    });
    return user;
  }

  //모든 유저 찾기
  async findAll({ page }): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.image', 'image')
      .where('user.password is not null')
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * 8)
      .take(8)
      .getMany();
  }

  async createUser({ createUserInput }) {
    const {
      email,
      password,
      cPassword,
      phone_number,
      nickname,
      image,
      ...user
    } = createUserInput;

    const isValid = await this.cacheManager.get(createUserInput.email);
    const checkNickName = await this.userRepository.findOne({
      where: { nickname },
    });
    const checkPhone = await this.userRepository.findOne({
      where: { phone_number },
    });
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (checkNickName) {
      throw new NotFoundException('이미 사용 중인 닉네임 입니다.');
    } else if (checkEmail)
      throw new NotFoundException('이미 사용 중인 이메일 입니다.');

    if (checkPhone) {
      throw new NotFoundException('이미 사용 중인 휴대폰 번호입니다.');
    }

    if (isValid !== true || !isValid)
      throw new BadRequestException('인증이 완료되지 않았습니다.');

    if (createUserInput.password !== createUserInput.cPassword) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    let userImage = null;

    if (image) {
      userImage = await this.imageRepository.save({
        imgUrl: image,
      });
    }
    const result = await this.userRepository.save({
      ...createUserInput,
      image: userImage,
      password: hashedPassword,
    });

    return result;
  }

  async update({ userId, updateUserInput }) {
    const { image, ...user } = updateUserInput;

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['image'],
    });

    let userImage = {};

    if (image) {
      userImage = await this.imageRepository.save({ imgUrl: image });
    }

    const result = await this.userRepository.save({
      ...findUser,
      ...user,
      image: { ...userImage },
    });

    await this.imageRepository.delete({ id: findUser.image.id });

    return result;
  }

  async delete({ userId }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['image'],
    });

    if (!user)
      throw new UnprocessableEntityException(
        '해당 유저 정보를 찾을 수 없습니다.',
      );

    const userInfo = await this.userRepository.save({
      id: userId,
      password: null,
      email: user.email + '(탈퇴)',
      nickname: user.nickname + '(탈퇴)',
      age: null,
      gender: null,
      mbti: null,
      image: null,
    });

    await this.imageRepository.delete({ id: user.image.id });

    if (userInfo) return true;
    else return false;
  }

  async findUserPassword({ email }) {
    const findUser = await this.userRepository.findOne({
      where: { email },
    });

    if (findUser.email !== email) {
      throw new Error('이메일 주소를 확인해주세요.');
    }

    const nickname = findUser.nickname;

    const randomPw = Math.random()
      .toString(30)
      .substring(2, 8)
      .padStart(8, 'a1');

    const hashPw = await bcrypt.hash(randomPw, 10);

    this.userRepository.update({ email: email }, { password: hashPw });

    const authTemplate = await this.mailService.getPasswordTemplate({
      nickname,
      randomPw,
    });

    const comment = `[작가의 정원] ${nickname}님, 임시 비밀번호 안내입니다.`;

    this.mailService.sendTemplateToEmail({ email, authTemplate, comment });

    return '임시 비밀번호가 전송되었습니다.';
  }

  async updatePassword({ userId, password }) {
    const hashedPw = await bcrypt.hash(password, 10);
    const changePw = await this.userRepository.findOne({
      where: { id: userId },
    });

    await this.userRepository.save({
      ...changePw,
      password: hashedPw,
    });

    return '비밀번호가 정상적으로 변경되었습니다.';
  }
}
