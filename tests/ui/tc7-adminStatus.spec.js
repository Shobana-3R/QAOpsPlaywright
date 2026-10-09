const { test } = require('@playwright/test');

const { AdminLoginPage } = require('../../POM/AdminLoginPage');
const { AdminDashboardPage } = require('../../POM/AdminDashboardPage');
const { AdminReportPage } = require('../../POM/AdminReportPage');

const adminData = require('../../testdata/adminData.json');
const adminReportData = require('../../testdata/adminReportData.json');

for (const data of adminReportData) {

    test(`Admin updates report status to ${data.status}`, async ({ page }) => {

        const adminLoginPage = new AdminLoginPage(page);
        const adminDashboardPage = new AdminDashboardPage(page);
        const adminReportPage = new AdminReportPage(page);

        // Login
        await page.goto('/');

        await adminLoginPage.clickAdminLink();
        await adminLoginPage.enterAdminEmail(adminData.email);
        await adminLoginPage.enterAdminPassword(adminData.password);
        await adminLoginPage.clickSignIn();

        // Open report from specified row
        await adminDashboardPage.openReport(data.row);

        // Update status
        await adminReportPage.changeStatus(data.status);

        // Enter resolution notes
        await adminReportPage.enterResolutionNotes(
            data.resolutionNotes
        );

        // Save
        await adminReportPage.clickSaveChanges();

        // Verify status badge
        await adminReportPage.verifyStatus(data.status);
    });
}