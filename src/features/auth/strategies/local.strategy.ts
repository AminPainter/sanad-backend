import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, attemptedPassword: string): Promise<any> {
    const authenticatedUser = await this.authService.validateUserCredentials(
      email,
      attemptedPassword,
    );
    return authenticatedUser;
  }
}
