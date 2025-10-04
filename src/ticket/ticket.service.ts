import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  getTicketsPaginated(organizationId: string) {
    return this.ticketRepository.getTicketsPaginated(organizationId);
  }
}
