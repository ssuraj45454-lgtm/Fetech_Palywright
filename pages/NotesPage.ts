import { Page, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class NotesPage extends ModulePage {
  constructor(page: Page) { super(page); }
  async expectLoaded() { await this.expectModuleLoaded('/bookmarks/notes'); }
  async expectNoteVisible(note: string) {
    await expect(this.page.getByText(note, { exact: true })).toBeVisible();
  }
}