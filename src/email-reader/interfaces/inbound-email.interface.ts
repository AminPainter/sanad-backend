export interface IInboundEmail {
  id: string;
  threadId: string;
  subject: string;
  textPlain: string;
  textHtml: string;
  sentAt: string;
  from: {
    emailAddress: string;
  };
  to: Array<{
    emailAddress: string;
  }>;
  cc: Array<{
    emailAddress: string;
  }>;
  snippet: string;
}
