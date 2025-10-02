import { Module } from '@nestjs/common';
import { EmailAccountController } from './email-account.controller';
import { ConnectEmailAccountService } from './services/connect-email-account.service';
import { EmailProviderFactory } from './email-providers/email-provider.factory';
import { GmailProvider } from './email-providers/gmail-provider';

@Module({
  controllers: [EmailAccountController],
  providers: [ConnectEmailAccountService, EmailProviderFactory, GmailProvider],
})
export class EmailAccountModule {}
