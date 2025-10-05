import { Module } from '@nestjs/common';

import { EmailAccountController } from './controllers/email-account.controller';
import { ConnectEmailAccountService } from './services/connect-email-account.service';
import { EmailAccountRepository } from './repositories/email-account.repository';
import { EmailConnectorFactory } from './email-connectors/email-connector.factory';
import { GmailConnector } from './email-connectors/gmail-connector';

@Module({
  controllers: [EmailAccountController],
  providers: [
    EmailAccountRepository,
    ConnectEmailAccountService,
    EmailConnectorFactory,
    GmailConnector,
  ],
  exports: [EmailAccountRepository],
})
export class EmailAccountModule {}
