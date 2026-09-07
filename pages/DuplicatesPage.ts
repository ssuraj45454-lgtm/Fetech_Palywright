import { Page } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class DuplicatesPage extends ModulePage {
  constructor(page: Page) { super(page); }
  async expectLoaded() { await this.expectModuleLoaded('/bookmarks/duplicates'); }
}