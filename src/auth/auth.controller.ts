import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { type Request } from 'express';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from 'generated/prisma';
import { SkipJwtAuth } from './auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    const user = req.user as User;
    const tokens = await this.authService.generateJwtForAuthenticatedUser(user);
    return { user, tokens };
  }
}
