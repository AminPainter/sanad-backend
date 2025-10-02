import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GmailProvider } from './gmail-provider';
import { TEmailProvider } from '../types/email-account.types';
import { EmailProvider } from '../constants/email-account.constants';
import { IEmailProvider } from './email-provider.interface';

@Injectable()
export class EmailProviderFactory {
  constructor(private gmailProvider: GmailProvider) {}

  createProvider(providerName: TEmailProvider): IEmailProvider {
    switch (providerName) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case EmailProvider.GMAIL:
        return this.gmailProvider;

      default:
        throw new InternalServerErrorException(
          `Unsupported email provider: ${providerName}`,
        );
    }
  }
}
