import path from 'node:path';
export const fixturePath = (...parts: string[]) => path.resolve(process.cwd(), 'test-data', ...parts);
