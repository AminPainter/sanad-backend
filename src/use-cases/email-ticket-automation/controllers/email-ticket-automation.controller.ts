import { Controller, Post, Req } from '@nestjs/common';

import { EmailTicketAutomationService } from '../services/email-ticket-automation.service';

import { type AuthenticatedRequest } from '@/shared/express/express.types';

@Controller('/email-ingestion')
export class EmailIngestionController {
  constructor(
    private EmailTicketAutomationService: EmailTicketAutomationService,
  ) {}

  @Post('/trigger-email-ingestion-job')
  triggerEmailIngestionJob(@Req() req: AuthenticatedRequest) {
    return this.EmailTicketAutomationService.ingest(req.user.organizationId);
  }
}
