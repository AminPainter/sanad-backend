import { Controller, Get, Req } from '@nestjs/common';

import { type AuthenticatedRequest } from '@/shared/express/express.types';

@Controller('/users')
export class UserController {
  @Get('/me')
  getMyProflie(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
