import { UserEntity } from '@src/apis/user/entities/user.entity';
import { IAuthUserItem, IContext } from '@src/commons/types/context';

export interface IUserAuthLoginService {
  email: string;
  password: string;
  context: IContext;
}

export interface IUserAuthServiceGetAccessToken {
  user: UserEntity | IAuthUserItem;
}

export interface IUserAuthServiceLogout {
  context: IContext;
}

export interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    address: string;
    phone_number: string;
  };
}

export interface TokenPayload {
  userId: number;
}
