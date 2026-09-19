import { APIRequestContext } from '@playwright/test';
import { AuthApi } from '../clients/auth.api';

export async function authenticate(request: APIRequestContext, username?: string, password?: string) {
  const authApi = new AuthApi(request);
  const result = await authApi.login(username, password);
  return result;
}

export function getBearerToken() {
  return AuthApi.getStoredToken();
}
