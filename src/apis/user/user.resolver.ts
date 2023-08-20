import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailService } from '@src/apis/mail/mail.service';
import { CreateUserInput } from '@src/apis/user/dto/create-user.input';
import { UpdateUserInput } from '@src/apis/user/dto/update-user.input';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { UserService } from '@src/apis/user/user.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly mailService: MailService,
  ) {}

  //닉네임 체크
  @Mutation(() => String)
  async checkNickname(
    @Args('nickname') nickname: string, //
  ) {
    const findNickname = await this.userService.findOne({ nickname });
    if (findNickname) {
      return false;
    }
    return true;
  }

  //이메일 체크
  @Mutation(() => String)
  async checkEmail(
    @Args('email') email: string, //
  ) {
    const findEmail = await this.userService.findOne({ email });
    if (findEmail) {
      return false;
    }
    return true;
  }

  //모든 유저 조회
  @Query(() => [UserEntity])
  fetchUsers(
    @Args({ name: 'page', type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<UserEntity[]> {
    return this.userService.findAll({ page });
  }

  //유저 조회
  @Query(() => UserEntity)
  fetchUser(@Args('userId') userId: string) {
    return this.userService.findUser({ userId });
  }

  //로그인된 유저 조회(마이페이지)
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => UserEntity)
  fetchUserLoggedIn(
    @Context() context: IContext, //
  ) {
    const userId = context.req.user.id;
    return this.userService.findMe({ userId });
  }

  //회원가입
  @Mutation(() => UserEntity)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.createUser({ createUserInput });
  }

  //회원정보 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @Context() context: IContext, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const userId = context.req.user.id;

    return this.userService.update({ userId, updateUserInput });
  }

  //회원탈퇴
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @Context() context: IContext, //
  ) {
    const userId = context.req.user.id;

    return await this.userService.delete({ userId });
  }

  //비밀번호 찾기(임시비밀번호 전송)
  @Mutation(() => String)
  findUserPassword(
    @Args('email') email: string, //
  ) {
    return this.userService.findUserPassword({ email });
  }

  //비밀번호 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  updatePassword(
    @Context() context: IContext, //
    @Args('password') password: string,
    @Args('rePassword') rePassword: string,
  ) {
    const userId = context.req.user.id;
    if (password !== rePassword)
      throw new BadRequestException('비밀번호를 다시 확인 해주세요.');

    return this.userService.updatePassword({ userId, password });
  }
}
