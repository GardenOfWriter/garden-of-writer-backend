import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { FictionBoard } from '../fiction_board/entities/fiction_board.entity';
import { User } from '../user/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(FictionBoard)
    private readonly fictionBoardRepository: Repository<FictionBoard>,
  ) {}

  async findAll({ boardId, fictionBoardId, page }) {
    return await this.commentRepository.find({
      where: { board: { id: boardId }, fictionBoard: { id: fictionBoardId } },
      relations: ['board', 'fictionBoard', 'user'],
      order: { createdAt: 'DESC' },
      take: 9,
      skip: page ? (page - 1) * 9 : 0,
    });
  }

  async create({ user, boardId, fictionBoardId, comment }) {
    const findId = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const findId2 = await this.fictionBoardRepository.findOne({
      where: { id: fictionBoardId },
    });

    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    return await this.commentRepository.save({
      comment,
      board: findId,
      fictionBoard: findId2,
      user: findUser,
    });
  }

  async delete({ commentId, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'board', 'fictionBoard'],
    });

    if (findUser.id !== findComment.user.id)
      throw new ConflictException('삭제 권한이 없습니다.');

    const result = await this.commentRepository.softDelete({
      id: commentId,
    });
    return result.affected ? true : false;
  }

  async update({ commentId, updateComment, user }) {
    const findUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const findComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'board', 'fictionBoard'],
    });

    if (user !== findComment.user.id)
      throw new ConflictException('수정 권한이 없습니다.');

    return await this.commentRepository.save({
      ...findComment,
      user: findUser,
      comment: updateComment,
    });
  }
}
