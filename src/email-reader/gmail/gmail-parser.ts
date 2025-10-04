import { gmail_v1 } from 'googleapis';
import { ParseGmailApi } from 'gmail-api-parse-message-ts';
import { DateTime } from 'luxon';

import { IInboundEmail } from '../interfaces/inbound-email.interface';

export class GmailParser {
  private parser: ParseGmailApi;

  constructor() {
    this.parser = new ParseGmailApi();
  }

  parseEmail(gmailApiResponse: gmail_v1.Schema$Message): IInboundEmail {
    const email = this.parser.parseMessage(gmailApiResponse);

    return {
      id: email.id,
      threadId: email.threadId,
      subject: email.subject,
      cc: email.cc.map((item) => ({ emailAddress: item.email })),
      from: { emailAddress: email.from.email },
      to: email.to.map((item) => ({ emailAddress: item.email })),
      sentAt: DateTime.fromMillis(email.sentDate).toISO()!,
      snippet: email.snippet,
      textHtml: email.textHtml,
      textPlain: email.textPlain,
    };
  }
}
