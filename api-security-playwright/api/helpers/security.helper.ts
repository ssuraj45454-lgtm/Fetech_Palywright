import { testConfig } from '../../config/test-config';

export function assertNoSensitiveData(responseBody: unknown, endpoint = '', allowedFields: string[] = []): void {
  const sensitivePatterns = testConfig.security.sensitiveKeyPatterns;
  const endpointAllowed = (testConfig.security.allowedSensitiveFieldsByEndpoint as Record<string, string[]>)[endpoint] || [];
  const allowed = new Set([
    ...endpointAllowed,
    ...allowedFields,
  ]);

  const seen: string[] = [];

  function traverse(current: unknown, path = ''): void {
    if (!current || typeof current !== 'object') {
      return;
    }

    if (Array.isArray(current)) {
      current.forEach((item, index) => traverse(item, `${path}[${index}]`));
      return;
    }

    Object.entries(current as Record<string, unknown>).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitivePatterns.some((pattern) => lowerKey.includes(pattern.toLowerCase()));
      if (isSensitive && !allowed.has(key) && !allowed.has(lowerKey)) {
        seen.push(`${path || 'root'}.${key}`);
      }
      traverse(value, `${path}.${key}`);
    });
  }

  traverse(responseBody);

  if (seen.length > 0) {
    throw new Error(`Sensitive data detected in response: ${seen.join(', ')}`);
  }
}
