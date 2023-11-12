import { Controller } from '@nestjs/common';
import { AuthService } from '@src/apis/auth/auth.service';
import { UserService } from '@src/apis/user/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}
}
