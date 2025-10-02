import { Injectable } from '@nestjs/common';
import { TEmailProvider } from '../types/email-account.types';
import { EmailProviderFactory } from '../email-providers/email-provider.factory';

@Injectable()
export class ConnectEmailAccountService {
  constructor(private emailProviderFactory: EmailProviderFactory) {}

  connect(providerName: TEmailProvider) {
    const provider = this.emailProviderFactory.createProvider(providerName);
    const connectionUrl = provider.getOAuthUrl();
    return connectionUrl;
  }

  handleConnectionCallback(providerName: TEmailProvider, code: string) {
    const provider = this.emailProviderFactory.createProvider(providerName);
    const credentials = provider.getUserCredentials(code);
    return credentials;
  }
}
