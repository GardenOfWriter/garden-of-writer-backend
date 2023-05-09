import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
} from './interface/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' },
    );
  }

  setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    const permittedOrigins = [
      'http://localhost:3000/',
      // 'https://mydatabase.meonjifather.shop/',
      // 'https://meonjifather.shop/',
      // 'https://backsol2.shop/',
    ];
    const origin = req.headers.origin;
    if (permittedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin, Accept, X-Requested-with, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );

    // res.setHeader(
    // "Set-Cookie",
    // `refreshToken=${refreshToken}; path=/; domain=.meonjifather.shop; SameSite=None; Secure; httpOnly`
    // );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.backsol2.shop; SameSite=None; Secure; httpOnly`,
    );
    // res.setHeader(
    //   "Set-Cookie",
    //   `refreshToken=${refreshToken}; path=/; Secure; httpOnly;`
    // );
    return refreshToken;
  }

  async OAuthLogin({ req, res }) {
    let user = await this.userService.findUserByEmail({
      email: req.user.email,
    });
    if (!user) user = await this.userService.createUser({ ...req.user });

    this.setRefreshToken({ user, req, res });
    res.redirection('');
  }
}
