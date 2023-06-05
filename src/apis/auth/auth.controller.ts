import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@src/apis/auth/auth.service';
import { IOAuthUser } from '@src/apis/auth/interface/auth-service.interface';
import { UserService } from '@src/apis/user/user.service';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.OAuthLogin({ req, res });
  }
}
