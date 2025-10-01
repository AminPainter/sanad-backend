import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipJwtAuth } from './auth.decorator';
import { type AuthenticatedRequest } from 'src/express/express.types';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    const tokens = await this.authService.generateJwtForAuthenticatedUser(user);
    return { user, tokens };
  }
}
