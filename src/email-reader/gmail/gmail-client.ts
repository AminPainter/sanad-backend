import { OAuth2Client } from 'google-auth-library';
import { google, gmail_v1 } from 'googleapis';

export class GmailClient {
  private oauthClient: OAuth2Client;
  private gmail: gmail_v1.Gmail;

  constructor(credentials: { accessToken: string; refreshToken: string }) {
    this.oauthClient = new google.auth.OAuth2({
      credentials: {
        access_token: credentials.accessToken,
        refresh_token: credentials.refreshToken,
      },
    });

    this.gmail = google.gmail({ version: 'v1', auth: this.oauthClient });
  }

  async fetchUnreadEmails() {
    const {
      data: { messages: emails },
    } = await this.gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'is:unread category:primary',
    });
    return emails || [];
  }

  async fetchEmailById(emailId: string): Promise<gmail_v1.Schema$Message> {
    const apiResponse = await this.gmail.users.messages.get({
      userId: 'me',
      id: emailId,
    });
    return apiResponse.data;
  }
}
