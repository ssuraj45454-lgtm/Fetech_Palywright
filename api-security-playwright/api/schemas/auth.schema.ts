export const authSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: { type: 'string' },
    refreshToken: { type: 'string' },
    expiresIn: { type: 'number' },
    user: { type: 'object' },
  },
  additionalProperties: true,
};
