import { Controller, Get, Req } from '@nestjs/common';
import { type Request } from 'express';

@Controller('/users')
export class UserController {
  @Get('/me')
  getMyProflie(@Req() req: Request) {
    return req.user;
  }
}
