import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FollowCount } from '../followCounts/followCount.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(FollowCount)
    private readonly followCountRepository: Repository<FollowCount>,
  ) {}

  async follow({ followerId, followingId }) {
    if (followerId === followingId)
      throw new BadRequestException('자신은 구독 할 수 없습니다.');

    const follower = await this.userRepository.findOne({
      where: { id: followingId },
    });

    if (!follower) throw new BadRequestException('존재하지 않는 유저 입니다.');

    const followingUserCount = await this.followCountRepository.findOne({
      where: { user: { id: followerId } },
    });

    const followerUserCount = await this.followCountRepository.findOne({
      where: { user: { id: followingId } },
    });

    const findFollow = await this.followRepository.findOne({
      where: { user1: { id: followerId }, user2: { id: followingId } },
    });

    if (!findFollow) {
      await this.followRepository.save({
        user1: { id: followerId },
        user2: { id: followingId },
      });

      await this.followCountRepository.update(
        { user: { id: followerId } },
        { followCount: +1 },
      );

      await this.followCountRepository.update(
        { user: { id: followingId } },
        { followerCount: +1 },
      );
      return '구독 완료!';
    } else {
      await this.followRepository.delete({
        user1: { id: followerId },
        user2: { id: followingId },
      });
      await this.followCountRepository.update(
        { user: { id: followerId } },
        { followCount: Math.max(followingUserCount.followCount - 1, 0) }, // 팔로우수가 0밑으로 못내려가게 방지
      );
      await this.followCountRepository.update(
        { user: { id: followingId } },
        { followerCount: Math.max(followerUserCount.followerCount - 1, 0) },
      );
      return '구독 취소!';
    }
  }

  async findUserFollower({ userId, page }) {
    const findFollower = await this.followRepository.find({
      where: { user2: { id: userId } },
      relations: ['user1', 'user1.image'],
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });
    return findFollower;
  }

  async findUserFollowing({ userId, page }) {
    const findUserFollowing = await this.followRepository.find({
      where: { user1: { id: userId } },
      relations: ['user2', 'user2.image'],
      take: 8,
      skip: page ? (page - 1) * 8 : 0,
    });

    return findUserFollowing;
  }

  async findFollowCount({ userId }) {
    const result = await this.followCountRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return result;
  }
}
