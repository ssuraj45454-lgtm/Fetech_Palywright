import { Locator } from '@playwright/test';

export async function typeSlowly(locator: Locator, value: string, delay = 80) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.click();
  await locator.pressSequentially(String(value), { delay });
}
