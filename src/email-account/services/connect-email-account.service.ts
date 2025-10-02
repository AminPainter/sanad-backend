import { Injectable } from '@nestjs/common';
import { TEmailProvider } from '../types/email-account.types';
import { EmailProviderFactory } from '../email-providers/email-provider.factory';
import { EmailAccountRepository } from '../repositories/email-account.repository';
import { HandleEmailAccountConnectionCallbackQueryDto } from '../validations/email-account.validation';

@Injectable()
export class ConnectEmailAccountService {
  constructor(
    private emailProviderFactory: EmailProviderFactory,
    private emailAccountRepository: EmailAccountRepository,
  ) {}

  connect(
    providerName: TEmailProvider,
    payload: { redirectUrl: string; organizationId: string; userId: string },
  ) {
    const provider = this.emailProviderFactory.createProvider(providerName);
    const connectionUrl = provider.getOAuthUrl(payload);
    return connectionUrl;
  }

  async handleConnectionCallback(
    providerName: TEmailProvider,
    code: string,
    state: HandleEmailAccountConnectionCallbackQueryDto['state'],
  ) {
    const provider = this.emailProviderFactory.createProvider(providerName);
    const credentials = await provider.getUserCredentials(code);
    await this.emailAccountRepository.upsert(
      {
        provider: providerName,
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        isActive: true,
        email: credentials.emailAddress,
      },
      state.organizationId,
      state.userId,
    );
  }
}
