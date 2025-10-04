import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { SHOULD_SKIP_JWT_AUTH } from '../auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const shouldSkipJwtAuth = this.reflector.getAllAndOverride<boolean>(
      SHOULD_SKIP_JWT_AUTH,
      [context.getHandler(), context.getClass()],
    );
    if (shouldSkipJwtAuth) return true;

    return super.canActivate(context);
  }
}
