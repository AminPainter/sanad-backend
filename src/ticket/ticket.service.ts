import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './ticket.validation';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  createTicket(createTicketDto: CreateTicketDto, organizationId: string) {
    return this.ticketRepository.createTicket(createTicketDto, organizationId);
  }

  getTicketsPaginated(organizationId: string) {
    return this.ticketRepository.getTicketsPaginated(organizationId);
  }
}
