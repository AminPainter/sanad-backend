import { IInboundEmail } from './inbound-email.interface';

export interface IEmailReader {
  fetchUnreadEmails(): Promise<IInboundEmail[]>;
}
