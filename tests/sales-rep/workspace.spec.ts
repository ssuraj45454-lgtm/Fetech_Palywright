import { test, expect } from '../../fixtures/salesRep.fixture';
import { FeaturePage } from '../../pages/FeaturePage';

test.describe('@sales-rep @regression personal workspace', () => {
  test('@smoke loads dashboard and captures actual available modules', async ({ salesRepPage }) => { await salesRepPage.goto('/dashboard'); expect(await salesRepPage.discoveredNavigation()).not.toEqual([]); });
  for (const module of ['Calls', 'Call Reports', 'AI Assist', 'AI Playground', 'Leads', 'Knowledge Base', 'Leaderboard', 'Profile', 'Settings']) test(`opens visible ${module}`, async ({ salesRepPage, page }) => {
    await salesRepPage.goto('/dashboard'); const item = salesRepPage.menuItem(new RegExp(module, 'i')); test.skip(await item.count() === 0, `${module} not exposed.`); await new FeaturePage(page).openFromNavigation(new RegExp(module, 'i'));
  });
});
