const { expect } = require('@playwright/test');

class AdminReportPage {

    constructor(page) {
        this.page = page;

        this.statusDropdown = page.locator(
            '//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[1]/button'
        );

        this.resolutionNotes = page.locator(
            '//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[2]/textarea'
        );

        this.saveChangesButton = page.locator(
            '//*[@id="root"]/div/div[2]/div/div/div[2]/div/button'
        );

        this.statusBadge = page.locator(
            '//*[@id="root"]/div/div[2]/div/div/div[1]/div[1]/div[1]/div[2]'
        );

        this.reportKey = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[1]/div[1]/div[1]/p[2]'
        );

        this.messageTextbox = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div[2]/textarea'
        );

        this.sendMessageButton = page.locator('//*[@id="root"]/div/div[2]/div/div/div[1]/div[2]/div[2]/button'
        )
    }

    async changeStatus(status) {
        await this.statusDropdown.click();
        await this.page.getByText(status, { exact: true }).click();
    }

    async enterResolutionNotes(notes) {
        await this.resolutionNotes.fill(notes);
    }

    async clickSaveChanges() {
        await this.saveChangesButton.click();
    }

    async verifyStatus(status) {
        await expect(this.statusBadge).toHaveText(status);
    }

    async getReportKey() {

        return (await this.reportKey.textContent()).trim();
    }

    async enterMessage(message) {

        await this.messageTextbox.fill(message);
    }

    async clickSendMessage() {

        await this.sendMessageButton.click();
    }
}

module.exports = { AdminReportPage };