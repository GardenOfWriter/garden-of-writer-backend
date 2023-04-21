import {
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/types/context';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { Cache } from 'cache-manager';
import { UserService } from '../user/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    const user = await this.userService.findOne({ email });
    console.log('===================');
    console.log(user);
    console.log('===================');
    //오류 반환,
    //이메일 오류
    if (!user) throw new UnprocessableEntityException('이메일을 확인해주세요.');
    //비밀번호 오류
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인해 주세요.');

    this.authService.setRefreshToken({
      user,
      req: context.req,
      res: context.res,
    });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.getAccessToken({ user: context.req.user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    const access = context.req.headers.authorization.replace('Bearer ', '');
    const refresh = context.req.headers.cookie.replace('refreshToken=', '');
    await this.cacheManager.set(`accessToken:${access}`, 'access', {
      ttl: 1209600,
    });
    await this.cacheManager.set(`refreshToken:${refresh}`, 'refresh', {
      ttl: 1209600,
    });
    try {
      const checkAccess = jwt.verify(access, process.env.JWT_ACCESS_KEY);
      const checkRefresh = jwt.verify(refresh, process.env.JWT_REFRESH_KEY);
      if (!checkAccess)
        throw new UnauthorizedException('유효하지 않은 토큰 입니다.');
      if (!checkRefresh)
        throw new UnauthorizedException('유효하지 않은 토큰 입니다.');
      this.cacheManager.set;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰 입니다.');
    }
    return '로그아웃이 완료 되었습니다.';
  }
}
