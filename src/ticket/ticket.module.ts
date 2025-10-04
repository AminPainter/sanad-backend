import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { CustomerModule } from 'src/customer/customer.module';
import { CreateTicketFromEmailUseCase } from './use-cases/create-ticket-from-email.use-case';

@Module({
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, CreateTicketFromEmailUseCase],
  imports: [CustomerModule],
  exports: [CreateTicketFromEmailUseCase],
})
export class TicketModule {}
