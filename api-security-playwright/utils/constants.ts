export const TEST_IDS = {
  REQ_001: 'REQ-001',
  REQ_002: 'REQ-002',
  RESP_001: 'RESP-001',
  RESP_002: 'RESP-002',
  AUTH_001: 'AUTH-001',
  AUTH_002: 'AUTH-002',
  AUTH_003: 'AUTH-003',
  AUTH_004: 'AUTH-004',
  AUTH_005: 'AUTH-005',
  AUTH_006: 'AUTH-006',
  AUTHZ_001: 'AUTHZ-001',
  AUTHZ_002: 'AUTHZ-002',
  AUTHZ_003: 'AUTHZ-003',
  AUTHZ_004: 'AUTHZ-004',
  AUTHZ_005: 'AUTHZ-005',
  PARAM_001: 'PARAM-001',
  PARAM_002: 'PARAM-002',
  PAYLOAD_001: 'PAYLOAD-001',
  PAYLOAD_002: 'PAYLOAD-002',
  RATE_001: 'RATE-001',
  TIMEOUT_001: 'TIMEOUT-001',
  HEADER_001: 'HEADER-001',
  CORS_001: 'CORS-001',
  VERSION_001: 'VERSION-001',
  OPTIONS_001: 'OPTIONS-001',
} as const;

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const;

export const SECURITY_HEADERS = [
  'strict-transport-security',
  'content-security-policy',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
] as const;
