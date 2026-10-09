const { expect } = require('@playwright/test');
const { test } = require('../../fixtures/reportFixture');

const { AdminLoginPage } = require('../../POM/AdminLoginPage');

const { AdminDashboardPage } = require('../../POM/AdminDashboardPage');

const { AdminReportPage } = require('../../POM/AdminReportPage');

const { FollowUpPage } = require('../../POM/FollowUpPage');

const { ReportApi } = require('../../utils/ReportAPI');

const adminData = require('../../testdata/adminData.json');

const followUpData = require('../../testdata/followUpData.json');

test('TC08 - Admin sends message and reporter receives message', async ({ page, submittedReport }) => {

        const adminLoginPage = new AdminLoginPage(page);

        const adminDashboardPage = new AdminDashboardPage(page);

        const adminReportPage = new AdminReportPage(page);

        const followUpPage = new FollowUpPage(page);

        const reportApi = new ReportApi(page.request);

        await page.goto('/'); //admin login

        await adminLoginPage.clickAdminLink();

        await adminLoginPage.enterAdminEmail(adminData.email);

        await adminLoginPage.enterAdminPassword(adminData.password);

        await adminLoginPage.clickSignIn();

        const reportResponsePromise = page.waitForResponse(response => {
        const url = response.url();
        return (
                    response.request().method() === 'GET' &&
                    /^https:\/\/concern-vault\.emergent\.host\/api\/admin\/reports\/[0-9a-f-]{36}$/.test(url)
                );
            }
        );

        await adminDashboardPage.openReportByReportKey(submittedReport.reportKey);

        const reportResponse = await reportResponsePromise;

        expect(reportResponse.status()).toBe(200);

        console.log('Report API URL:', reportResponse.url());

        const reportData = await reportResponse.json();

        console.log('Report API response:', reportData);

        expect(reportData.id).toBeTruthy();
        expect(reportData.report_key).toBe(submittedReport.reportKey);

        const reportId = reportData.id;
        const reportKey = reportData.report_key;

        console.log('Report ID:', reportId);
        console.log('Report Key:', reportKey);



        const message = followUpData.message;

        const postResponse = await reportApi.sendAdminMessage(
                reportId,
                message
            );


        // Validate POST status
        expect(postResponse.status()).toBe(200);

        const updatedResponse = await reportApi.getReport(reportId);


        expect(updatedResponse.status()).toBe(200);


        const updatedReport = await updatedResponse.json();

        const adminMessage = updatedReport.messages.find(
                msg =>
                    msg.author === 'admin' &&
                    msg.message === message
            );


        expect(adminMessage).toBeDefined();

        expect(adminMessage.message).toBe(message);

        expect(adminMessage.author).toBe('admin');


        // ==========================================
        // 7. UI - REPORTER FOLLOW-UP
        // ==========================================

        await page.goto('/follow-up');


        await followUpPage.enterReportKey(
            submittedReport.reportKey
        );


        await followUpPage.enterPassword(
            submittedReport.password
        );


        // ==========================================
        // 8. UI - ACCESS REPORT
        // ==========================================

        await followUpPage.clickAccessReport();


        // ==========================================
        // 9. UI - VERIFY MESSAGE
        // ==========================================

        await followUpPage.verifyMessageDetails(message);
    }
);