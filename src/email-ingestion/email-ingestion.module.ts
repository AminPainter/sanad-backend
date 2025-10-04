import { Module } from '@nestjs/common';
import { EmailIngestionController } from './controllers/email-ingestion.controller';
import { EmailIngestionService } from './services/email-ingestion.service';
import { EmailAccountModule } from 'src/email-account/email-account.module';
import { EmailReaderModule } from 'src/email-reader/email-reader.module';

@Module({
  imports: [EmailAccountModule, EmailReaderModule],
  providers: [EmailIngestionService],
  controllers: [EmailIngestionController],
})
export class EmailIngestionModule {}
