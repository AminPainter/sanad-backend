export interface IEmailProvider {
  getOAuthUrl(): string;
  getUserCredentials(
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
