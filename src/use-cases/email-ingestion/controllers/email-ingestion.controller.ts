import { Controller, Post, Req } from '@nestjs/common';

import { EmailIngestionService } from '../services/email-ingestion.service';

import { type AuthenticatedRequest } from '@/shared/express/express.types';

@Controller('/email-ingestion')
export class EmailIngestionController {
  constructor(private emailIngestionService: EmailIngestionService) {}

  @Post('/trigger-email-ingestion-job')
  triggerEmailIngestionJob(@Req() req: AuthenticatedRequest) {
    return this.emailIngestionService.ingest(req.user.organizationId);
  }
}
