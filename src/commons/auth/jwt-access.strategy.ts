import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const accessToken = req.headers.authorization.replace('Bearer ', '');

    const redisAccessToken = await this.cacheManager.get(
      `accessToken:${accessToken}`,
    );

    if (redisAccessToken === 'accessToken') {
      throw new UnauthorizedException('이미 로그아웃된 토큰입니다');
    }
    return {
      email: payload.email,
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
