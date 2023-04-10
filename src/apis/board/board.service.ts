import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneById({ boardId }) {
    const boardUser = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });
    return boardUser;
  }

  findAllByUserId({ userId }) {
    return this.boardRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findByMyUserId({ userId, boardId }) {
    const result = await this.boardRepository.findOne({
      where: {
        id: boardId,
        user: { id: userId },
      },
      relations: ['user'],
    });
    return result;
  }

  findAllByMyUserId({ userId, page }) {
    return this.boardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
  }

  findAll({ page }) {
    return this.boardRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  findAllWithLikeCount({ page }) {
    return this.boardRepository.find({
      relations: ['user'],
      order: { like: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
  }

  async searchAllBoards({ word, page }) {
    const findBoard = await this.boardRepository.find({
      where: { title: Like(`%${word}%`) },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
    return findBoard;
  }

  async create({ userId, createBoardInput }) {
    const User = await this.userRepository.findOne({
      where: { id: userId },
    });

    const result = await this.boardRepository.save({
      ...createBoardInput,
      user: { ...User },
    });
    return result;
  }

  async update({ boardId, userId, updateBoardInput }) {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    const findBoard = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });

    if (userId !== findBoard.user.id) {
      throw new ConflictException('수정 권한이 없습니다.');
    }

    return await this.boardRepository.save({
      ...findBoard,
      ...updateBoardInput,
      user: findUser,
    });
  }

  async delete({ boardId, userId }) {
    const Board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['user'],
    });

    if (userId !== Board.user.id) {
      throw new ConflictException('삭제 권한이 없습니다.');
    }

    const result = await this.boardRepository.delete({
      id: boardId,
      user: { id: userId },
    });
    return result.affected ? true : false;
  }
}
