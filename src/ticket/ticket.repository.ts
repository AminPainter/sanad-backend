import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './ticket.validation';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  createTicket(data: CreateTicketDto, organizationId: string) {
    return this.prisma.ticket.create({
      data: {
        ...data,
        organization: {
          connect: { id: organizationId },
        },
      },
    });
  }
}
