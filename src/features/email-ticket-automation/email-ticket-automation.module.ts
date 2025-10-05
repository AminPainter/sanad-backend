import { Module } from '@nestjs/common';

import { EmailIngestionController } from './controllers/email-ticket-automation.controller';
import { EmailTicketAutomationService } from './services/email-ticket-automation.service';
import { CreateTicketFromEmail } from './services/create-ticket-from-email';

import { EmailAccountModule } from '@/features/email-account/email-account.module';
import { EmailReaderModule } from '@/features/email-reader/email-reader.module';
import { TicketModule } from '@/features/ticket/ticket.module';
import { CustomerModule } from '@/features/customer/customer.module';

@Module({
  imports: [
    EmailAccountModule,
    EmailReaderModule,
    TicketModule,
    CustomerModule,
  ],
  providers: [EmailTicketAutomationService, CreateTicketFromEmail],
  controllers: [EmailIngestionController],
})
export class EmailIngestionModule {}
