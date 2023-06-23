import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-google-oauth20';

/**
 * @todo Oauth key 발급 후 super 부분 환경변수 및 유효한 값으로
 */
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      clientID: 'temp',
      clientSecret: 'temp',
      callbackURL: 'temp',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      name: profile.displayName,
      email: profile.email,
    };
  }
}
