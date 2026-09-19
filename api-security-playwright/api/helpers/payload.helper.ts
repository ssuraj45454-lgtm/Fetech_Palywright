export function buildLargePayload(overLimit = false) {
  const size = overLimit ? 110000 : 100000;
  return {
    name: 'Rahul',
    email: 'rahul@example.com',
    description: 'A'.repeat(size),
  };
}

export function buildUserPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Rahul',
    email: 'rahul@example.com',
    role: 'user',
    ...overrides,
  };
}
