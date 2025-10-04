import { Injectable } from '@nestjs/common';

import { CreateTicketFromEmail } from './create-ticket-from-email';

import { EmailAccountRepository } from '@/features/email-account/repositories/email-account.repository';
import { EmailReaderFactory } from '@/features/email-reader/factories/email-reader.factory';

@Injectable()
export class EmailTicketAutomationService {
  constructor(
    private emailAccountRepository: EmailAccountRepository,
    private emailReaderFactory: EmailReaderFactory,
    private createTicketFromEmailUseCase: CreateTicketFromEmail,
  ) {}

  async ingest(organizationId: string) {
    const emailAccounts =
      await this.emailAccountRepository.findAllForOrganization(organizationId);

    const emailAccount = emailAccounts[0];

    const emailReader = this.emailReaderFactory.createReader(
      emailAccount.partner,
      {
        accessToken: emailAccount.accessToken,
        refreshToken: emailAccount.refreshToken,
      },
    );

    const unreadEmails = await emailReader.fetchUnreadEmails();

    await Promise.all(
      unreadEmails.map((email) =>
        this.createTicketFromEmailUseCase.execute(email, organizationId),
      ),
    );
  }
}
