import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUserAuthLoginService,
  IUserAuthServiceGetAccessToken,
  IUserAuthServiceLogout,
} from '@src/apis/auth/interface/auth-service.interface';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { UserService } from '@src/apis/user/user.service';
import { ENV_KEY } from '@src/commons/config/app-config/app-config.constant';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login({ email, password, context }: IUserAuthLoginService) {
    const user = await this.userRepository.findOne({ where: { email } });

    //존재하는 유저 검증
    if (!user) {
      throw new UnprocessableEntityException('회원이 존재하지 않습니다.');
    }

    //비밀번호 오류
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('암호를 확인해주세요.');
    }

    const accessToken = await this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      {
        secret: this.appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
        expiresIn: '2d',
      },
    );

    const permittedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:5678',
      'http://localhost:5678',
    ];
    const req = context.req;
    const res = context.res;
    const origin = req.headers.origin;
    if (permittedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    //배포서버
    res.setHeader(
      'Set-Cookie',
      `accessToken=${accessToken}; domain=.SameSite=None; Secure; httpOnly; path=/;`,
    );
    res.cookie('accessToken', accessToken, {
      maxAge: 120_000,
      httpOnly: true,
      secure: true,
    });

    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: this.appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
        expiresIn: '2d',
      },
    );
  }

  getAccessToken({ user }: IUserAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: this.appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
        expiresIn: '2d',
      },
    );
  }

  async logout({ context }: IUserAuthServiceLogout): Promise<string> {
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );

    // const accessToken2 = context.req.headers.cookie.replace('accessToken=', '');

    try {
      const decodedAccessToken = jwt.verify(
        accessToken,
        this.appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
      );
      // const decodedAccessToken2 = jwt.verify(
      //   accessToken2,
      //   this.appConfigService.get<string>(ENV_KEY.JWT_ACCESS_KEY),
      // );

      const currentTime = new Date().getTime();
      const accessTokenTtl =
        decodedAccessToken['exp'] - Number(String(currentTime).slice(0, -3));
      // const accessToken2Ttl =
      // decodedAccessToken2['exp'] - Number(String(currentTime).slice(0, -3));

      await this.cacheManager.set(
        `accessToken:${accessToken}`,
        `accessToken`,
        accessTokenTtl,
      );

      // await this.cacheManager.set(
      //   `accessToken2:${accessToken2}`,
      //   `accessToken2`,
      //   // accessToken2Ttl,
      // );
    } catch (error) {
      throw new UnprocessableEntityException('유효하지 않은 토큰입니다.');
    }

    return '로그아웃 되었습니다.';
  }

  // setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string {
  //   const refreshToken = this.jwtService.sign(
  //     { email: user.email, sub: user.id }, //
  //     {
  //       secret: this.appConfigService.get<string>(ENV_KEY.JWT_REFRESH_KEY),
  //       expiresIn: '2w',
  //     },
  //   );

  //   const permittedOrigins = [
  //     'http://localhost:3000/',
  //     // 'https://mydatabase.meonjifather.shop/',
  //     // 'https://meonjifather.shop/',
  //     // 'https://backsol2.shop/',
  //   ];
  //   const origin = req.headers.origin;
  //   if (permittedOrigins.includes(origin)) {
  //     res.setHeader('Access-Control-Allow-Origin', origin);
  //   }
  //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  //   res.setHeader(
  //     'Access-Control-Allow-Headers',
  //     'Access-Control-Allow-Headers, Origin, Accept, X-Requested-with, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  //   );

  //   // res.setHeader(
  //   // "Set-Cookie",
  //   // `refreshToken=${refreshToken}; path=/; domain=.meonjifather.shop; SameSite=None; Secure; httpOnly`
  //   // );
  //   res.setHeader(
  //     'Set-Cookie',
  //     `refreshToken=${refreshToken}; path=/; domain=.backsol2.shop; SameSite=None; Secure; httpOnly`,
  //   );
  //   // res.setHeader(
  //   //   "Set-Cookie",
  //   //   `refreshToken=${refreshToken}; path=/; Secure; httpOnly;`
  //   // );
  //   return refreshToken;
  // }
}
