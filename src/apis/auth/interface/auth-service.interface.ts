import { User } from '@src/apis/user/entities/user.entity';
import { IAuthUserItem } from '@src/commons/types/context';
import { Request, Response } from 'express';

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
