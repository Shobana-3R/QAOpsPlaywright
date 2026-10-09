const { test, expect } = require('@playwright/test')
const { AdminLoginPage } = require('../../POM/AdminLoginPage');
const { AdminDashboardPage } = require('../../POM/AdminDashboardPage');

const testData = require('../../testdata/adminData.json')
test.use({
    permissions: ['geolocation']
});
test('Admin login + dashboard validation', async({page}) => {
const adminLoginPage = new AdminLoginPage(page)
const adminDashboardPage = new AdminDashboardPage(page)
await page.goto('/');
await adminLoginPage.clickAdminLink();
await adminLoginPage.enterAdminEmail(testData.email)
await adminLoginPage.enterAdminPassword(testData.password)
await adminLoginPage.clickSignIn()
await adminLoginPage.verifySignedInMessage()
await adminDashboardPage.verifyPageUser()
await adminDashboardPage.verifyPageTitle()
await adminDashboardPage.verifySignedinUser(testData.email)
await adminDashboardPage.verifyAllDashboardCounts()
await adminDashboardPage.verifyReportTable()
}
)
