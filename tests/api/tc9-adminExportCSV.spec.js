const { test, expect } = require('@playwright/test');
const { AdminLoginPage } = require('../../POM/AdminLoginPage');
const { AdminDashboardPage } = require('../../POM/AdminDashboardPage');
const { ReportApi } = require('../../utils/ReportAPI');
const adminData = require('../../testdata/adminData.json');
const { parse } = require('csv-parse/sync');

test('TC09 - Validate exported CSV data against backend API report data',
    async ({ page }) => {
        const adminLoginPage = new AdminLoginPage(page);
        const adminDashboardPage = new AdminDashboardPage(page);
        const reportApi = new ReportApi(page.request);

//admin login
        await page.goto('/');
        await adminLoginPage.clickAdminLink();
        await adminLoginPage.enterAdminEmail(adminData.email);
        await adminLoginPage.enterAdminPassword(adminData.password);
        await adminLoginPage.clickSignIn();
        await adminLoginPage.verifySignedInMessage();
//dashboard
        await adminDashboardPage.verifyPageTitle();
        await adminDashboardPage.verifyReportTable();
//getreports
        const reportsResponse = await reportApi.getReports();
        expect(reportsResponse.status()).toBe(200);
        const apiData = await reportsResponse.json();
//reports array
        const apiReports = Array.isArray(apiData)
                ? apiData
                : apiData.reports;

        expect(apiReports).toBeDefined();
        expect(Array.isArray(apiReports)).toBe(true);
//export csv
        const downloadPromise = page.waitForEvent('download');
        await adminDashboardPage.clickExportCSV();
        const download = await downloadPromise;

//read csv
        const csvStream = await download.createReadStream();
        let csvContent = '';
        for await (const chunk of csvStream) { csvContent += chunk.toString(); }

//parse csv

        const csvRecords = parse( csvContent,
            {
                columns: true,
                skip_empty_lines: true,
                trim: true
            }
        );

        expect(csvRecords.length).toBeGreaterThan(0);

//validate count
        expect(csvRecords.length).toBe(apiReports.length);
    });