import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { GmailReader } from '../gmail';

import { EmailPartner } from '@/features/email-partner/constants/email-partner.constants';
import { TEmailPartner } from '@/features/email-partner/types/email-partner.types';

@Injectable()
export class EmailReaderFactory {
  createReader(
    integration: TEmailPartner,
    credentials: { accessToken: string; refreshToken: string },
  ) {
    switch (integration) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      case EmailPartner.GMAIL:
        return new GmailReader(credentials);

      default:
        throw new InternalServerErrorException(
          `Unsupported email integration: ${integration}`,
        );
    }
  }
}
