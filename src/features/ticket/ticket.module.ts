import { Module } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';

import { CustomerModule } from '@/features/customer/customer.module';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
  imports: [CustomerModule],
  exports: [TicketRepository],
})
export class TicketModule {}
