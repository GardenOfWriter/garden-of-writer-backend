import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FictionBoardService {
  constructor(
    @InjectRepository(FictionBoardEntity)
    private readonly fictionBoardRepository: Repository<FictionBoardEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneById({ fictionBoardId }) {
    const fictionBoardUser = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });
    return fictionBoardUser;
  }

  findAllByUserId({ userId }) {
    return this.fictionBoardRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findByMyUserId({ userId, fictionBoardId }) {
    const result = await this.fictionBoardRepository.findOne({
      where: {
        id: fictionBoardId,
        user: { id: userId },
      },
      relations: ['user'],
    });
    return result;
  }

  findAllByMyUserId({ userId, page }) {
    return this.fictionBoardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
  }

  findAll({ page }) {
    return this.fictionBoardRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  findAllWithLikeCount({ page }) {
    return this.fictionBoardRepository.find({
      relations: ['user'],
      order: { likeCount: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  async searchAllBoard({ word, page }) {
    const findFictionBoard = await this.fictionBoardRepository.find({
      where: { title: Like(`%${word}%`) },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
    return findFictionBoard;
  }

  //도배방지 로직 (신규) 1번 안되면 1번주석하고 2번시도
  //1번
  // async create({ userId, createFictionBoardInput }) {
  //   const User = await this.userRepository.findOne({
  //     where: { id: userId },
  //   });

  //   const wordLimit = 5;

  //   if (hasRepeatedChars(createFictionBoardInput.content, wordLimit)) {
  //     throw new ConflictException(' 도배 방지! ');
  //   }

  //   function hasRepeatedChars(content: string, wordLimit: number): boolean {
  //     for (let i = 0; i < content.length - wordLimit; i++) {
  //       const target = content.substr(i, wordLimit);

  //       if (target === target[0].repeat(wordLimit)) {
  //         return true;
  //       }
  //     }

  //     return false;
  //   }

  //   const result = await this.fictionBoardRepository.save({
  //     ...createFictionBoardInput,
  //     user: { ...User },
  //   });
  //   return result;
  // }

  //2번
  // async create({ userId, createFictionBoardInput }) {
  //   try {
  //     const User = await this.userRepository.findOne({
  //       where: { id: userId },
  //     });

  //     const wordLimit = 5;

  //     if (hasRepeatedChars(createFictionBoardInput.content, wordLimit)) {
  //       throw new ConflictException('도배 방지!');
  //     }

  //     const result = await this.fictionBoardRepository.save({
  //       ...createFictionBoardInput,
  //       user: { ...User },
  async create({ userId, createFictionBoardInput }) {
    const wordLimit = 5;

    function hasRepeatedChars(content: string, wordLimit: number): boolean {
      for (let i = 0; i < content.length - wordLimit; i++) {
        const target = content.substr(i, wordLimit);

        if (target === target[0].repeat(wordLimit)) {
          return true;
        }
      }
      return false;
    }
    try {
      const User = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (hasRepeatedChars(createFictionBoardInput.content, wordLimit)) {
        throw new ConflictException('도배 방지!');
      }

      const result = await this.fictionBoardRepository.save({
        ...createFictionBoardInput,
        user: { ...User },
      });

      return result;
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update({ fictionBoardId, userId, updateFictionBoardInput }) {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    const findFictionBoard = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });

    if (userId !== findFictionBoard.user.id) {
      throw new ConflictException('수정 권한이 없습니다.');
    }

    return await this.fictionBoardRepository.save({
      ...findFictionBoard,
      ...updateFictionBoardInput,
      user: findUser,
    });
  }

  async delete({ fictionBoardId, userId }) {
    const FictionBoard = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
      relations: ['user'],
    });

    if (userId !== FictionBoard.user.id) {
      throw new ConflictException('삭제 권한이 없습니다.');
    }

    const result = await this.fictionBoardRepository.delete({
      id: fictionBoardId,
      user: { id: userId },
    });
    return result.affected ? true : false;
  }
}
