import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailService } from '@src/apis/mail/mail.service';
import { CreateUserInput } from '@src/apis/user/dto/create-user.input';
import { UpdateUserInput } from '@src/apis/user/dto/update-user.input';
import { UserEntity } from '@src/apis/user/entities/user.entity';
import { UserService } from '@src/apis/user/user.service';
import { GqlAuthAccessGuard } from '@src/commons/auth/gql-auth.guard';
import { User } from '@src/commons/decorators/user.decorator';
import { IContext } from '@src/commons/types/context';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly mailService: MailService,
  ) {}

  //닉네임 체크
  @Mutation(() => Boolean)
  async checkNickname(
    @Args('nickname') nickname: string, //
  ) {
    const user = await this.userService.findOne({ nickname });
    return user ? false : true;
  }

  //이메일 체크
  @Mutation(() => Boolean)
  async checkEmail(
    @Args('email') email: string, //
  ) {
    const user = await this.userService.findOne({ email });
    return user ? false : true;
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

  // //회원정보 수정
  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => UserEntity)
  // async updateUser(
  //   @Context() context: IContext, //
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ) {
  //   const userId = context.req.user.id;

  //   return this.userService.update({ userId, updateUserInput });
  // }

  //회원정보 수정(유저 데코레이터 )
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @User() user: UserEntity, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const userId = user.id;

    return this.userService.update({ userId, updateUserInput });
  }

  //회원탈퇴
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(
    @User() user: UserEntity, //
  ) {
    const userId = user.id;

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
    @User() user: UserEntity, //
    @Args('password') password: string,
    @Args('rePassword') rePassword: string,
  ) {
    const userId = user.id;
    if (password !== rePassword)
      throw new BadRequestException('비밀번호를 다시 확인 해주세요.');

    return this.userService.updatePassword({ userId, password });
  }
}
