import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  createTicket() {
    return this.prisma.ticket.create({
      data: {
        title: 'Sample Ticket',
        description: 'This is a sample ticket',
        organizationId: 1,
      },
    });
  }

  getTicketsPaginated() {
    return this.prisma.ticket.findMany({
      take: 10,
      skip: 0,
    });
  }
}
