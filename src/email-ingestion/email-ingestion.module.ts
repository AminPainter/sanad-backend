import { Module } from '@nestjs/common';
import { EmailIngestionController } from './controllers/email-ingestion.controller';
import { EmailIngestionService } from './services/email-ingestion.service';
import { EmailAccountModule } from 'src/email-account/email-account.module';

@Module({
  imports: [EmailAccountModule],
  providers: [EmailIngestionService],
  controllers: [EmailIngestionController],
})
export class EmailIngestionModule {}
