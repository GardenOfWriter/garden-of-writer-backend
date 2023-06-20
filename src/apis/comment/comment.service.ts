import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '@src/apis/board/entities/board.entity';
import { CommentEntity } from '@src/apis/comment/entities/comment.entity';
import { FictionBoardEntity } from '@src/apis/fiction-board/entities/fiction-board.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    @InjectRepository(FictionBoardEntity)
    private readonly fictionBoardRepository: Repository<FictionBoardEntity>,
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
