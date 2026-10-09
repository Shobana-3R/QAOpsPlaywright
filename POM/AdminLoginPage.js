const {test, expect} = require('@playwright/test');
class AdminLoginPage {

    constructor(page) {
        this.page = page;
        this.adminLink = page.locator('//*[@id="root"]/div/div[2]/header/div/nav/a[3]')
        this.adminEmail = page.locator('//*[@id="root"]/div/div[2]/div/form/div[2]/div[1]/input')
        this.adminPassword = page.locator('//*[@id="root"]/div/div[2]/div/form/div[2]/div[2]/input')
        this.signInButton = page.locator('//*[@id="root"]/div/div[2]/div/form/div[2]/button')
        this.signedInToast = page.getByText('Signed in', { exact: true });
    }

    async clickAdminLink() {
        await this.adminLink.click();
    }
    async enterAdminEmail(email) {
        await this.adminEmail.fill(email);
    }
    async enterAdminPassword(password) {
        await this.adminPassword.fill(password);
    }
    async clickSignIn() {
        await this.signInButton.click();
    }
    async verifySignedInMessage() {
        await expect(this.signedInToast).toBeVisible();
    }

}

module.exports = { AdminLoginPage };