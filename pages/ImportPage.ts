import { Page } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class ImportPage extends ModulePage {
  constructor(page: Page) { super(page); }
  async expectLoaded() { await this.expectModuleLoaded('/import'); }
}