import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowCountEntity } from '@src/apis/follow-counts/follow-count.entity';
import { FollowEntity } from '@src/apis/follow/entities/follow.entity';
import { UserEntity } from '@src/apis/user/entities/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(FollowCountEntity)
    private readonly followCountRepository: Repository<FollowCountEntity>,
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
        { followingCount: +1 },
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
        { followingCount: Math.max(followingUserCount.followingCount - 1, 0) }, // 팔로우수가 0밑으로 못내려가게 방지
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
