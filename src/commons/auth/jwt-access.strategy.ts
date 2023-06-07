import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ENV_KEY } from '@src/commons/config/app-config/app-config.constant';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
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
