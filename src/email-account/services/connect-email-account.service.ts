import { Injectable } from '@nestjs/common';
import { EmailAccountRepository } from '../repositories/email-account.repository';
import { HandleEmailAccountConnectionCallbackQueryDto } from '../validations/email-account.validation';
import { TEmailPartner } from 'src/email-partner/types/email-partner.types';
import { EmailConnectorFactory } from '../email-connectors/email-connector.factory';

@Injectable()
export class ConnectEmailAccountService {
  constructor(
    private emailConnectorFactory: EmailConnectorFactory,
    private emailAccountRepository: EmailAccountRepository,
  ) {}

  connect(
    partnerName: TEmailPartner,
    payload: { redirectUrl: string; organizationId: string; userId: string },
  ) {
    const connector = this.emailConnectorFactory.createConnector(partnerName);
    const connectionUrl = connector.getOAuthUrl(payload);
    return connectionUrl;
  }

  async handleConnectionCallback(
    partnerName: TEmailPartner,
    code: string,
    state: HandleEmailAccountConnectionCallbackQueryDto['state'],
  ) {
    const connector = this.emailConnectorFactory.createConnector(partnerName);
    const credentials = await connector.getUserCredentials(code);
    await this.emailAccountRepository.upsert(
      {
        partner: partnerName,
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
