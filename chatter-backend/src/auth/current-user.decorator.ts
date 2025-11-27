/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

const getCurrentUserByContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  } else if (context.getType<GqlContextType>() === 'graphql') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
