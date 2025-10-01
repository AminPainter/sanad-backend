import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
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
