import { test, expect } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Feedback and Feature Requests module should load @smoke @regression', async ({ loginPage, feedbackPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await feedbackPage.expectLoaded();
  await expect(feedbackPage.page.getByRole('heading', { name: /Feedback & Feature Requests/i })).toBeVisible();
  await expect(feedbackPage.page.getByRole('button', { name: /New Submission/i })).toBeVisible();
  await expect(feedbackPage.page.getByRole('button', { name: /Feature Requests/i })).toBeVisible();
  await expect(feedbackPage.page.getByRole('button', { name: /Bug Reports/i })).toBeVisible();
  await expect(feedbackPage.page.getByRole('button', { name: /Feedback/i })).toBeVisible();
});

test('User should add a new feature request @smoke @regression', async ({ loginPage, feedbackPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await feedbackPage.expectLoaded();
  await feedbackPage.submitFeedbackByCategory('Feature Request', 'Playwright feature request', 'We need a better export experience for bookmarks.');
  await expect(feedbackPage.page.getByRole('heading', { name: /Playwright feature request/i }).first()).toBeVisible();
});

test('User should add a new bug report @smoke @regression', async ({ loginPage, feedbackPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await feedbackPage.expectLoaded();
  await feedbackPage.submitFeedbackByCategory('Bug Report', 'Playwright bug report', 'The import flow is failing in the browser automation test run.');
  await expect(feedbackPage.page.getByRole('heading', { name: /Playwright bug report/i }).first()).toBeVisible();
});

test('User should add a new feedback submission @smoke @regression', async ({ loginPage, feedbackPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await feedbackPage.expectLoaded();
  await feedbackPage.submitFeedbackByCategory('Feedback', 'Playwright feedback test', 'This is an automated test submission created by Playwright.');
  await expect(feedbackPage.page.getByRole('heading', { name: /Playwright feedback test/i }).first()).toBeVisible();
});