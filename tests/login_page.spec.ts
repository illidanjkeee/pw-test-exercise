import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import credentials from '../util/credentials.json';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage();
    await loginPage.navigateToLoginPage(page);
  });

  const loginTestCases = [
    {
      description: 'Should successfully login with valid credentials',
      username: credentials.validUser.username,
      password: credentials.validUser.password,
      shouldSucceed: true,
    },
    {
      description: 'Should not login with invalid username',
      username: credentials.invalidUsername, // Invalid username
      password: credentials.validUser.password,
      shouldSucceed: false,
    },
    {
      description: 'Should not login with invalid password',
      username: credentials.validUser.username,
      password: credentials.invalidPassword, // Invalid password
      shouldSucceed: false,
    },
  ];

  for (const testCase of loginTestCases) {
    test(testCase.description, async ({ page }) => {
      await loginPage.enterUsername(page, testCase.username);
      await loginPage.enterPassword(page, testCase.password);
      await loginPage.clickLoginButton(page);

      if (testCase.shouldSucceed) {
        await loginPage.assertLoginSuccess(page);
      } else {
        await loginPage.assertLoginFailure(page);
      }
    });
  }
});