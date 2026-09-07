export const unique = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
export const generateUniqueEmail = () => `pw-${unique()}@example.test`;
export const generateUniqueName = (prefix = 'PW User') => `${prefix} ${unique()}`;
export const generateUniquePhone = () => `9${Math.floor(100000000 + Math.random() * 899999999)}`;
export const generateOrganizationName = () => `PW Org ${unique()}`;
