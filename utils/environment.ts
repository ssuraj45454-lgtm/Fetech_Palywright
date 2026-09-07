import { credentials } from '../data/test-data';

export function hasTestCredentials(): boolean {
  return Boolean(credentials.email && credentials.password);
}

export const credentialsMessage =
  'SALESCOACH_EMAIL and SALESCOACH_PASSWORD are required. Copy .env.example to .env and use a dedicated test account.';
