import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';

import { UserRepository } from '@/features/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(email: string, attemptedPassword: string) {
    const user = await this.userRepository.safeFindByEmail(email);
    const isPasswordValid = attemptedPassword === 'valid';
    if (!user || !isPasswordValid)
      throw new UnauthorizedException('Email or password is incorrect');

    return user;
  }

  async generateJwtForAuthenticatedUser(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
