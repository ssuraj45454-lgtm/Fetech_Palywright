export const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id: { type: ['number', 'string'] },
    name: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' },
  },
  additionalProperties: true,
};
