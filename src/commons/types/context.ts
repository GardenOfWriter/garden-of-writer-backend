export interface IAuthUserItem {
  email: string;
  id: string;
  exp: number;
}

export interface IUserItem {
  email: string;
}

export interface IUser {
  user?: {
    id: string;
    email: string;
    exp: number;
    password: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}
