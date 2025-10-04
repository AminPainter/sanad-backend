import { IEmail } from './email.interface';

export interface IEmailReader {
  fetchUnreadEmails(): Promise<IEmail[]>;
}
