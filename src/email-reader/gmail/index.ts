import { gmail_v1 } from 'googleapis';

import { IEmailReader } from '../interfaces/email-reader.interface';
import { GmailClient } from './gmail-client';
import { GmailParser } from './gmail-parser';

export class GmailReader implements IEmailReader {
  private gmailClient: GmailClient;
  private gmailParser: GmailParser;

  constructor(credentials: { accessToken: string; refreshToken: string }) {
    this.gmailClient = new GmailClient(credentials);
    this.gmailParser = new GmailParser();
  }

  async fetchUnreadEmails() {
    const unreadEmails = await this.gmailClient.fetchUnreadEmails();

    const parsedEmails = await Promise.all(
      this.getParsedUnreadEmailPromises(unreadEmails),
    );

    return parsedEmails;
  }

  private getParsedUnreadEmailPromises(emails: gmail_v1.Schema$Message[]) {
    return emails.map(async (email) => {
      const response = await this.gmailClient.fetchEmailById(email.id!);
      return this.gmailParser.parseEmail(response);
    });
  }
}
