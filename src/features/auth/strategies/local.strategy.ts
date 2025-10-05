import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

import { User } from 'generated/prisma';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, attemptedPassword: string): Promise<User> {
    const authenticatedUser = await this.authService.validateUserCredentials(
      email,
      attemptedPassword,
    );
    return authenticatedUser;
  }
}
