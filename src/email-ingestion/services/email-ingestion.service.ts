import { Injectable } from '@nestjs/common';
import { EmailAccountRepository } from 'src/email-account/repositories/email-account.repository';
import { EmailReaderFactory } from 'src/email-reader/factories/email-reader.factory';

@Injectable()
export class EmailIngestionService {
  constructor(private emailAccountRepository: EmailAccountRepository) {}

  async ingest(organizationId: string) {
    const emailAccounts =
      await this.emailAccountRepository.findAllForOrganization(organizationId);

    const emailAccount = emailAccounts[0];

    const emailReader = EmailReaderFactory.createReader(emailAccount.partner, {
      accessToken: emailAccount.accessToken,
      refreshToken: emailAccount.refreshToken,
    });

    return emailReader.fetchUnreadEmails();
  }
}
