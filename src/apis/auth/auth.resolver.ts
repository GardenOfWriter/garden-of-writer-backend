import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@src/apis/auth/auth.service';
import { UserService } from '@src/apis/user/user.service';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from '@src/commons/auth/gql-auth.guard';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import { IContext } from '@src/commons/types/context';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly appConfigService: AppConfigService,
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
    return await this.authService.login({ email, password, context });
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
    return this.authService.logout({ context });
  }
}
