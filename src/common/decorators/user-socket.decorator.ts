import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/shared/interface/gateway.interface';

export const UserSocket = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<AuthenticatedSocket>();
    return client.user;
  },
);
