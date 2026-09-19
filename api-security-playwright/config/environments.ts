export interface EnvironmentConfig {
  baseUrl: string;
  apiVersion: string;
  authEndpoint: string;
  usersEndpoint: string;
  requestTimeout: number;
  responseTimeout: number;
  rateLimitRequests: number;
  testUsername: string;
  testPassword: string;
  testToken: string;
}

export const environmentConfig: EnvironmentConfig = {
  baseUrl: process.env.BASE_URL || 'https://fetchtab-api.pankajdev.in',
  apiVersion: process.env.API_VERSION || 'v1',
  authEndpoint: process.env.AUTH_ENDPOINT || '/auth/login',
  usersEndpoint: process.env.USERS_ENDPOINT || '/bookmarks/count',
  requestTimeout: Number(process.env.REQUEST_TIMEOUT || 10000),
  responseTimeout: Number(process.env.RESPONSE_TIMEOUT || 10000),
  rateLimitRequests: Number(process.env.RATE_LIMIT_REQUESTS || 20),
  testUsername: process.env.TEST_USERNAME || '',
  testPassword: process.env.TEST_PASSWORD || '',
  testToken: process.env.TEST_TOKEN || '',
};
