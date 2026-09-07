import { Page, Locator, expect } from '@playwright/test';

export class AITabsPage {
  static readonly extensionStoreUrl = 'https://chromewebstore.google.com/detail/fetchtab-al-brain-for-tab/gimhifbpofpkhecjllcogoebkllpkepd';
  readonly page: Page;
  readonly installExtensionButton: Locator;
  readonly importTabsButton: Locator;
  readonly searchInput: Locator;
  readonly noMatchingTabsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.installExtensionButton = page.getByRole('button', { name: 'Install Extension' });
    this.importTabsButton = page.getByRole('button', { name: 'Import Tabs' });
    this.searchInput = page.getByRole('textbox', { name: 'Search tabs...' });
    this.noMatchingTabsHeading = page.getByRole('heading', { name: 'No Matching Tabs Found' });
  }

  async goto() {
    await this.page.goto('/tabs');
    await expect(this.searchInput).toBeVisible();
  }

  async search(value: string) {
    await this.searchInput.fill(value);
  }

  async expectNoMatchingTabs() {
    await expect(this.noMatchingTabsHeading).toBeVisible();
    await expect(this.page.getByText(/couldn't find any tabs matching your search/i)).toBeVisible();
  }

  async expectExtensionPrompt() {
    await expect(this.installExtensionButton).toBeVisible();
  }

  async openExtensionStore() {
    const extensionPagePromise = this.page.context().waitForEvent('page');
    await this.installExtensionButton.click();
    const extensionPage = await extensionPagePromise;
    await expect.poll(() => extensionPage.url()).toBe(AITabsPage.extensionStoreUrl);
    return extensionPage;
  }

  async gotoWithExtension() {
    await this.page.addInitScript(() => {
      document.documentElement.setAttribute('data-fetchtab-installed', 'true');
    });
    await this.page.goto('/tabs');
    await this.page.evaluate(() => {
      document.documentElement.setAttribute('data-fetchtab-installed', 'true');
      window.dispatchEvent(new Event('FetchTabExtensionLoaded'));
    });
    await expect(this.importTabsButton).toBeVisible();
  }

  async expectImportRequest() {
    const messagePromise = this.page.evaluate(() => new Promise<unknown>((resolve) => {
      window.addEventListener('message', (event) => {
        if (event.data?.type === 'FETCHTAB_OPEN_POPUP') resolve(event.data);
      }, { once: true });
    }));
    await this.importTabsButton.click();
    await expect.poll(async () => await messagePromise).toEqual({ type: 'FETCHTAB_OPEN_POPUP', startView: 'tabs' });
  }
}