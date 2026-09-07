export const environment = {
  baseURL: process.env.BASE_URL ?? 'https://salescoach-28ae3.firebaseapp.com',
  name: process.env.TEST_ENV ?? 'staging',
} as const;
