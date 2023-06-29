import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '@src/apis/user/entities/user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req;

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
