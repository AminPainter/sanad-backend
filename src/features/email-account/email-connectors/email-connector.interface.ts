export interface IEmailConnector {
  getOAuthUrl(params: {
    redirectUrl: string;
    organizationId: string;
    userId: string;
  }): string;

  getUserCredentials(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    emailAddress: string;
  }>;
}
