export const testConfig = {
  security: {
    sensitiveKeyPatterns: [
      'password',
      'passwordHash',
      'secret',
      'clientSecret',
      'privateKey',
      'apiKey',
      'databasePassword',
    ],
    allowedSensitiveFieldsByEndpoint: {
      '/api/v1/login': ['token', 'refreshToken'],
      '/api/v1/users': [],
    },
    expectedStatuses: {
      unauthorized: 401,
      forbidden: 403,
      badRequest: 400,
      notFound: 404,
      methodNotAllowed: 405,
      tooManyRequests: 429,
      payloadTooLarge: 413,
      ok: 200,
    },
  },
  api: {
    defaultHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    defaultTimeout: Number(process.env.REQUEST_TIMEOUT || 10000),
  },
};
