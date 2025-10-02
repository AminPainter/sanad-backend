import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TEmailProvider } from '../types/email-account.types';

@Injectable()
export class EmailAccountRepository {
  constructor(private prisma: PrismaService) {}

  upsert(
    data: {
      email: string;
      provider: TEmailProvider;
      accessToken: string;
      refreshToken: string;
      isActive: boolean;
      meta?: object;
    },
    organizationId: string,
    connectedById: string,
  ) {
    const { email, provider, accessToken, refreshToken, isActive, meta } = data;
    return this.prisma.emailAccount.upsert({
      where: {
        organizationId_email: {
          organizationId,
          email,
        },
      },
      update: {
        accessToken,
        refreshToken,
        connectedById,
        isActive,
        meta,
      },
      create: {
        organizationId,
        email,
        provider,
        accessToken,
        refreshToken,
        connectedById,
        isActive,
        meta,
      },
    });
  }
}
