import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<User> => {
    let req = ctx.switchToHttp().getRequest();
    const user = User.findOne({ where: { username: req.user.username } });
    req.user = user;
    return req.user;
  },
);
