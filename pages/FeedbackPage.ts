import { Page, Locator, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class FeedbackPage extends ModulePage {
  readonly newSubmissionButton: Locator;
  readonly dialog: Locator;

  constructor(page: Page) {
    super(page);
    this.newSubmissionButton = page.getByRole('button', { name: /new submission/i });
    this.dialog = page.getByRole('dialog').first();
  }

  async expectLoaded() { await this.expectModuleLoaded('/feedback'); }

  async openNewSubmission() {
    await this.newSubmissionButton.click();
    await expect(this.dialog).toBeVisible();
  }

  async selectCategory(category: 'Feature Request' | 'Bug Report' | 'Feedback') {
    const categoryButton = this.page.getByRole('button', { name: new RegExp(`^${category}$`, 'i') });
    await categoryButton.click();
  }

  async submitFeedbackByCategory(category: 'Feature Request' | 'Bug Report' | 'Feedback', title: string, description: string) {
    await this.openNewSubmission();
    await this.selectCategory(category);

    const submissionText = this.page.getByRole('textbox', { name: /what's on your mind|describe your idea|feedback/i });

    await expect(submissionText).toBeVisible({ timeout: 15000 });
    await submissionText.fill(`${title}\n\n${description}`);
    await this.page.getByRole('button', { name: /^submit$/i }).click();
  }

  async submitFeedback(title: string, description: string) {
    await this.submitFeedbackByCategory('Feedback', title, description);
  }
}