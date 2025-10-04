import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './ticket.validation';
import { type AuthenticatedRequest } from 'src/express/express.types';

@Controller('/tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('/')
  createTicket(
    @Req() req: AuthenticatedRequest,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketService.createTicket(
      createTicketDto,
      req.user.organizationId,
    );
  }

  @Get('/')
  getTickets(@Req() req: AuthenticatedRequest) {
    return this.ticketService.getTicketsPaginated(req.user.organizationId);
  }
}
