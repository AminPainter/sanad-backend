import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TicketCreateInput) {
    return this.prisma.ticket.create({
      data,
    });
  }

  getTicketsPaginated(organizationId: string) {
    return this.prisma.ticket.findMany({
      take: 10,
      skip: 0,
      where: {
        organizationId,
      },
    });
  }
}
