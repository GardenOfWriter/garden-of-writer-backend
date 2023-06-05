import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '@src/apis/board/entities/board.entity';
import { FictionBoard } from '@src/apis/fiction_board/entities/fiction_board.entity';
import { Pick } from '@src/apis/pick/entities/pick.entity';
import { User } from '@src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PicksService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(FictionBoard)
    private readonly fictionBoardRepository: Repository<FictionBoard>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Pick)
    private readonly picksRepository: Repository<Pick>,
  ) {}

  async findWithBoard({ userId, page }) {
    const result = await this.picksRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'board', 'user.image', 'board.user.image'],
      order: { createdAt: 'DESC' },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
    return result;
  }

  async findWithFictionBoard({ userId, page }) {
    const result = await this.picksRepository.find({
      where: { user: { id: userId } },
      relations: [
        'user',
        'fictionBoard',
        'user.image',
        'fictionBoard.user.image',
      ],
      order: { createdAt: 'DESC' },
      take: 5,
      skip: page ? (page - 1) * 5 : 0,
    });
    return result;
  }

  async pickBoard({ boardId, userId }) {
    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const findPick = await this.picksRepository.findOne({
      where: {
        board: { id: boardId },
        user: { id: findUser.id },
      },
      relations: ['board', 'user'],
    });

    if (findPick) {
      await this.picksRepository.delete({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const board = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { pickCount: Math.max(board.pickCount - 1, 0) }, //구독수가 0과 -1중에 큰것을 고르게 해서 음수를 방지하는 로직
      );

      return '찜 취소';
    } else {
      await this.picksRepository.save({
        board: { id: boardId },
        user: { id: findUser.id },
      });

      const boards = await this.boardsRepository.findOne({
        where: { id: boardId },
      });

      await this.boardsRepository.update(
        { id: boardId },
        { pickCount: boards.pickCount + 1 },
      );

      return '찜 추가';
    }
  }

  async pickFictionBoard({ fictionBoardId, userId }) {
    const findUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const findPick = await this.picksRepository.findOne({
      where: {
        fictionBoard: { id: fictionBoardId },
        user: { id: findUser.id },
      },
      relations: ['FictionBoard', 'user'],
    });

    if (findPick) {
      await this.picksRepository.delete({
        fictionBoard: { id: fictionBoardId },
        user: { id: findUser.id },
      });

      const fictionBoard = await this.fictionBoardRepository.findOne({
        where: { id: fictionBoardId },
      });

      await this.fictionBoardRepository.update(
        { id: fictionBoardId },
        { pickCount: Math.max(fictionBoard.pickCount - 1, 0) }, //구독수가 0과 -1중에 큰것을 고르게 해서 음수를 방지하는 로직
      );

      return '찜 취소';
    } else {
      await this.picksRepository.save({
        fictionBoard: { id: fictionBoardId },
        user: { id: findUser.id },
      });

      const fictionBoard = await this.fictionBoardRepository.findOne({
        where: { id: fictionBoardId },
      });

      await this.fictionBoardRepository.update(
        { id: fictionBoardId },
        { pickCount: fictionBoard.pickCount + 1 },
      );

      return '찜 추가';
    }
  }

  async deleteBoard({ boardId, userId }) {
    return await this.picksRepository.delete({
      board: boardId,
      user: userId,
    });
  }

  async deleteFictionBoard({ FictionBoardId, userId }) {
    return await this.picksRepository.delete({
      fictionBoard: FictionBoardId,
      user: userId,
    });
  }
}
