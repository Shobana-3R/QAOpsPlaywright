const { expect } = require('@playwright/test');
class FollowUpPage {

    constructor(page) {
        this.page = page;
        this.followReportButton = page.getByRole('button', { name: 'Follow Up On a Report' })
        this.reportKey = page.locator('//*[@id="root"]/div/div[2]/div/form/div/div[1]/input');
        this.password = page.locator('//*[@id="root"]/div/div[2]/div/form/div/div[2]/input')
        this.AccessReportButton = page.locator('//*[@id="root"]/div/div[2]/div/form/div/button');
        this.organization = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div[1]/p[2]');
        this.category = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div[2]/p[2]');
        this.description = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[3]/p[2]');
        this.attachment = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[4]/ul/li');
        this.addMessage = page.locator('//*[@id="root"]/div/div[2]/div/div/div[2]/div[2]/textarea')
        this.sendMessageButton = page.locator('//*[@id="root"]/div/div[2]/div/div/div[2]/div[2]/button')
        this.verifyMessage = page.locator('//*[@id="root"]/div/div[2]/div/div/div[2]/div[1]/div/p[2]')
        this.messageAddedToast = page.getByText('Message added', { exact: true });
    }

    async clickFollowupButton() {
        await this.followReportButton.click();
    }
    async enterReportKey(reportKey) {
        await this.reportKey.fill(reportKey);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async clickAccessReport() {
        await this.AccessReportButton.click();
    }

    async verifyReportDetails(data) {

        await expect(this.organization)
            .toContainText(data.organization);

        await expect(this.category)
            .toContainText(data.violation);

        await expect(this.description)
            .toContainText(data.description);

        await expect(this.attachment)
            .toContainText(data.evidence.split('/').pop());
    }
    async enterMessage(message) {
        await this.addMessage.fill(message);
    }
    async clickSendMessage() {
        await this.sendMessageButton.click();
    }
    async verifyMessageAdded() {
        await expect(this.messageAddedToast).toBeVisible();
    }
    async verifyMessageDetails(message) {
        await expect(this.verifyMessage).toContainText(message)

    }

}

module.exports = { FollowUpPage };