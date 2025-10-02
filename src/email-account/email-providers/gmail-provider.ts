import { BadRequestException, Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { IEmailProvider } from './email-provider.interface';

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.readonly',
];

@Injectable()
export class GmailProvider implements IEmailProvider {
  private oauthClient: OAuth2Client;

  constructor() {
    this.oauthClient = new OAuth2Client({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    });
  }

  getOAuthUrl(params: {
    redirectUrl: string;
    organizationId: string;
    userId: string;
  }): string {
    const { redirectUrl, organizationId, userId } = params;

    return this.oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: REQUIRED_SCOPES,
      state: JSON.stringify({
        redirectUrl,
        organizationId,
        userId,
      }),
    });
  }

  async getUserCredentials(code: string) {
    const { tokens: credentials } = await this.oauthClient.getToken(code);
    const validatedCredentials = this.validateCredentials(credentials);
    const profile = await this.fetchUserProfile(credentials);

    return {
      accessToken: validatedCredentials.accessToken,
      refreshToken: validatedCredentials.refreshToken,
      emailAddress: profile.email!,
    };
  }

  private validateCredentials(credentials: Credentials) {
    if (
      !credentials.access_token ||
      !credentials.refresh_token ||
      !credentials.scope
    )
      throw new BadRequestException(
        'Failed to obtain access or refresh token from Google',
      );

    this.validateScopesProvidedByUser(credentials.scope.split(' '));

    return {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token,
    };
  }

  private validateScopesProvidedByUser(scopes: string[]) {
    const hasAllRequiredScopes = REQUIRED_SCOPES.every((requiredScope) =>
      scopes.includes(requiredScope),
    );
    if (!hasAllRequiredScopes) {
      throw new BadRequestException(
        'The provided scopes do not include all required scopes.',
      );
    }
  }

  private async fetchUserProfile(credentials: Credentials) {
    const { data } = await google
      .oauth2({
        auth: new OAuth2Client({ credentials }),
        version: 'v2',
      })
      .userinfo.get();

    return {
      name: data.name,
      email: data.email,
    };
  }
}
