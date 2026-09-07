import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

const friendEmail = process.env.FETCHTAB_FRIEND_EMAIL || 'suraj13@yopmail.com';

test.describe('Friend Request', () => {
  test('User should send a friend request @regression', async ({ loginPage, friendsTeamsPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
    await friendsTeamsPage.sendFriendInvite(friendEmail!);
    await friendsTeamsPage.expectInviteSent(friendEmail!);
  });
});