import { Controller, Get, Req } from '@nestjs/common';

import { TicketService } from './ticket.service';

import { type AuthenticatedRequest } from '@/shared/express/express.types';

@Controller('/tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('/')
  getTickets(@Req() req: AuthenticatedRequest) {
    return this.ticketService.getTicketsPaginated(req.user.organizationId);
  }
}
