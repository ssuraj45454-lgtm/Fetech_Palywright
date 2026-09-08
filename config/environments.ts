export const environment = {
  baseURL: process.env.BASE_URL ?? 'https://fetchtab.pankajdev.in',
  name: process.env.TEST_ENV ?? 'staging',
} as const;
