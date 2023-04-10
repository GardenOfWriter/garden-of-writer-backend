import { CACHE_MANAGER, Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { userService } from 'src/apis/user/user.service';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
  constructor(
    private readonly mailsService: MailService, //
    private readonly usersService: userService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async sendTokenToEmail(
    @Args('email') email: string, //
  ) {
    this.mailsService.checkEmail({ email });
    const checkUserEmail = await this.usersService.findOne({ email });

    if (checkUserEmail)
      throw new NotFoundException('이미 등록 된 이메일 입니다.');

    const token = this.mailsService.createToken();
    await this.cacheManager.set(email, token, { ttl: 300 });

    const authTemplate = this.mailsService.getAuthNumberTemplate({ token });

    const comment = '[작가의 정원] 요청하신 인증번호 6자리를 입력 해 주세요.';

    this.mailsService.sendTemplateToEmail({ email, authTemplate, comment });

    return '인증번호가 전송 되었습니다.';
  }

  @Mutation(() => String)
  async checkTokenEmail(
    @Args('email') email: string, //
    @Args('token') token: string,
  ) {
    const cacheTokenEmail = await this.cacheManager.get(email);
    if (cacheTokenEmail === token) {
      await this.cacheManager.set(email, true, { ttl: 800 });
      return '인증완료';
    } else if (cacheTokenEmail !== token) {
      throw new NotFoundException('인증번호가 일치하지 않습니다.');
    } else
      throw new NotFoundException('만료되었거나 인증완료 된 인증번호 입니다.');
  }
}
