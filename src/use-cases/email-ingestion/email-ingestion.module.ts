import { Module } from '@nestjs/common';

import { EmailIngestionController } from './controllers/email-ingestion.controller';
import { EmailIngestionService } from './services/email-ingestion.service';
import { CreateTicketFromEmailUseCase } from './create-ticket-from-email.use-case';

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
  providers: [EmailIngestionService, CreateTicketFromEmailUseCase],
  controllers: [EmailIngestionController],
})
export class EmailIngestionModule {}
