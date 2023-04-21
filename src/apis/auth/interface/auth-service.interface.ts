import { Request, Response } from 'express';
import { User } from 'src/apis/user/entities/user.entity';
import { IAuthUserItem } from 'src/commons/types/context';

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
  req: Request;
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
