import { Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('/tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('/')
  createTicket() {
    return this.ticketService.createTicket();
  }

  @Get('/')
  getTickets() {
    return this.ticketService.getTicketsPaginated();
  }
}
