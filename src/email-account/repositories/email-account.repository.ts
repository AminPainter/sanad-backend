import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TEmailPartner } from 'src/email-partner/types/email-partner.types';

@Injectable()
export class EmailAccountRepository {
  constructor(private prisma: PrismaService) {}

  findAllForOrganization(organizationId: string) {
    return this.prisma.emailAccount.findMany({
      where: {
        organizationId,
      },
    });
  }

  upsert(
    data: {
      email: string;
      partner: TEmailPartner;
      accessToken: string;
      refreshToken: string;
      isActive: boolean;
      meta?: object;
    },
    organizationId: string,
    connectedById: string,
  ) {
    const { email, partner, accessToken, refreshToken, isActive, meta } = data;
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
        partner,
        accessToken,
        refreshToken,
        connectedById,
        isActive,
        meta,
      },
    });
  }
}
