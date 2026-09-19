import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './base.api';
import { environmentConfig } from '../../config/environments';

export class AuthApi extends BaseApi {
  private static tokenStore: string | null = null;

  constructor(request: APIRequestContext) {
    super(request);
  }

  static getStoredToken(): string | null {
    return this.tokenStore || environmentConfig.testToken || null;
  }

  static setStoredToken(token: string | null): void {
    this.tokenStore = token;
  }

  async login(username?: string, password?: string) {
    const requestBody = {
      email: username || environmentConfig.testUsername,
      password: password || environmentConfig.testPassword,
    };

    const response = await this.post(environmentConfig.authEndpoint, {
      data: requestBody,
      failOnStatusCode: false,
    });

    const responseBody = await response.json().catch(() => ({}));
    const token = responseBody?.token || responseBody?.accessToken || responseBody?.data?.token || environmentConfig.testToken;

    if (token && typeof token === 'string') {
      AuthApi.setStoredToken(token);
    }

    return { response, body: responseBody };
  }

  async logout() {
    const token = AuthApi.getStoredToken();
    return this.post(`${environmentConfig.authEndpoint}/logout`, {
      auth: token ? `Bearer ${token}` : undefined,
      failOnStatusCode: false,
    });
  }

  async refreshToken(token?: string) {
    const currentToken = token || AuthApi.getStoredToken();
    return this.post(`${environmentConfig.authEndpoint}/refresh`, {
      auth: currentToken ? `Bearer ${currentToken}` : undefined,
      failOnStatusCode: false,
    });
  }
}
