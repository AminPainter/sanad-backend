import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './ticket.validation';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private ticketRepository: TicketRepository,
  ) {}

  createTicket(createTicketDto: CreateTicketDto, organizationId: string) {
    return this.ticketRepository.createTicket(createTicketDto, organizationId);
  }

  getTicketsPaginated() {
    return this.prisma.ticket.findMany({
      take: 10,
      skip: 0,
    });
  }
}
