export function generateRandomEmail() {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export function generateRandomString(length = 12): string {
  return Array.from({ length }, () => Math.random().toString(36).charAt(2) || 'a').join('');
}
