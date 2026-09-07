import { Page, Locator, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class FriendsTeamsPage extends ModulePage {
  readonly inviteFriendButton: Locator;
  readonly friendEmailInput: Locator;
  readonly sendInviteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inviteFriendButton = page.getByRole('button', { name: 'Invite Friend', exact: true });
    this.friendEmailInput = page.getByPlaceholder('friend@example.com');
    this.sendInviteButton = page.getByRole('button', { name: 'Send Invite', exact: true });
  }

  async expectLoaded() { await this.expectModuleLoaded('/friends-teams'); }

  async sendFriendInvite(email: string) {
    await this.expectLoaded();
    await this.inviteFriendButton.click();
    await expect(this.friendEmailInput).toBeVisible();
    await this.friendEmailInput.fill(email);
    await this.sendInviteButton.click();
  }

  async expectInviteSent(email: string) {
    await expect(this.page.getByText('Invite sent!', { exact: true })).toBeVisible();
    await expect(this.page.getByText(`Invitation sent to ${email}`, { exact: true })).toBeVisible();
  }
}