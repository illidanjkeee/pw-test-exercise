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
      description: 'Login with valid credentials',
      username: credentials.validUser.username,
      password: credentials.validUser.password,
      shouldSucceed: true,
    },
    {
      description: 'Login with incorrect username',
      username: credentials.invalidUsername, // Incorrect username
      password: credentials.validUser.password,
      shouldSucceed: false,
    },
    {
      description: 'Login with incorrect password',
      username: credentials.validUser.username,
      password: credentials.invalidPassword, // Incorrect password
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