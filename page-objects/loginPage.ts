import { expect, Page } from '@playwright/test'


export class LoginPage {
    private readonly usernameField: string;
    private readonly passwordField: string;
    private readonly loginButton: string;
    
    constructor() {
        this.usernameField = '#username';
        this.passwordField = '#password';
        this.loginButton = '#submit';
    }

    async navigateToLoginPage(page: any) {
        await page.goto('https://practicetestautomation.com/practice-test-login/'); 
    }

    async enterUsername(page: any, username: string) {
        await page.fill(this.usernameField, username);
    }

    async enterPassword(page: any, password: string) {
        await page.fill(this.passwordField, password);
    }

    async clickLoginButton(page: any) {
        await page.click(this.loginButton);
    }

    async assertLoginSuccess(page: any) {
        const successMessage = await page.locator('.post-title').textContent();
        expect(successMessage).toContain('Logged In Successfully');
    }

    async assertLoginFailure(page: any) {
        const errorMessage = await page.locator('#error').textContent();
        expect(errorMessage).toMatch(/Your username is invalid!|Your password is invalid!/);
    }

    async assertLoginPage(page: any) {
        const loginPageTitle = await page.title();
        expect(loginPageTitle).toContain('Test Login | Practice Test Automation');
    }

    async login(page: Page, username: string, password: string): Promise<void> {
        this.assertLoginPage(page);
        this.enterUsername(page, username);
        this.enterPassword(page, password);
        this.clickLoginButton(page);
    }
}

// module.exports = { LoginPage };