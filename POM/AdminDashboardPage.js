const { test, expect } = require('@playwright/test');
class AdminDashboardPage {

    constructor(page) {
        this.page = page;
        this.pageUser = page.getByText('Admin Console', { exact: true });
        this.pageTitle = page.getByText('Report Dashboard', { exact: true });
        this.signedinUser = page.locator('//*[@id="root"]/div/div[2]/div/div[1]/div/p[2]/strong')
        this.totalCard = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]')
        this.newCard = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[2]')
        this.underReviewCard = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[3]')
        this.resolvedCard = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[4]')
        this.closedCard = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[5]')
        this.reportTable = page.locator('//table')
        this.exportCSVButton = page.locator('//*[@id="root"]/div/div[2]/div/div[2]/button');

    }

    async verifyPageUser() {
        await expect(this.pageUser).toBeVisible();
    }
    async verifyPageTitle() {
        await expect(this.pageTitle).toBeVisible();
    }
    async verifySignedinUser(email) {
        await expect(this.signedinUser).toContainText(email)
    }
    async verifyAllDashboardCounts() {
        await expect(this.totalCard).toContainText(/\d+/);
        await expect(this.newCard).toContainText(/\d+/);
        await expect(this.underReviewCard).toContainText(/\d+/);
        await expect(this.resolvedCard).toContainText(/\d+/);
        await expect(this.closedCard).toContainText(/\d+/);
    }
    async verifyReportTable() {
        await expect(this.reportTable).toBeVisible();
    }
    async openReport(rowNumber) {
        await this.reportTable.locator('tbody tr').nth(rowNumber - 1).click();
    }
    async openReportByReportKey(reportKey) {
        const reportRow = this.reportTable
            .locator('tbody tr')
            .filter({ hasText: reportKey });

        await expect(reportRow).toBeVisible();
        await reportRow.click();
    }

    async clickExportCSV() {
        await this.exportCSVButton.click();
    }

}

module.exports = { AdminDashboardPage };