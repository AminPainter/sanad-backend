import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationRegistrationService {
  constructor(private prisma: PrismaService) {}

  async registerOrganization() {
    return this.prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: 'Test Organization',
        },
      });

      const user = await tx.user.create({
        data: {
          email: 'firstuser@test.com',
          organization: {
            connect: {
              id: organization.id,
            },
          },
          name: 'First User',
        },
      });

      return { organization, user };
    });
  }
}
