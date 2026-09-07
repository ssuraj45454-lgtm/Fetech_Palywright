import { expect, Page } from '@playwright/test';

export async function expectAccessDeniedOrRedirected(page: Page, protectedPath: string): Promise<void> {
  const escaped = protectedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const denied = page.getByText(/access denied|not authorized|permission|unauthorized/i).first();
  await expect.poll(async () => (await denied.isVisible().catch(() => false)) || !new RegExp(escaped).test(page.url()), {
    message: `Expected ${protectedPath} to deny access or redirect`,
  }).toBeTruthy();
}
