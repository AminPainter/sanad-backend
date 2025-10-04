import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { GmailConnector } from './gmail-connector';
import { IEmailConnector } from './email-connector.interface';

import { TEmailPartner } from '@/features/email-partner/types/email-partner.types';
import { EmailPartner } from '@/features/email-partner/constants/email-partner.constants';

@Injectable()
export class EmailConnectorFactory {
  constructor(private gmailConnector: GmailConnector) {}

  createConnector(partnerName: TEmailPartner): IEmailConnector {
    switch (partnerName) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case EmailPartner.GMAIL:
        return this.gmailConnector;

      default:
        throw new InternalServerErrorException(
          `Unsupported email partner: ${partnerName}`,
        );
    }
  }
}
