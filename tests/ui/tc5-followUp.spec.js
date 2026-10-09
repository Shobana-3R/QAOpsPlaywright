const { test } = require('../../fixtures/reportFixture');
const { FollowUpPage } = require('../../POM/FollowUpPage');

test.use({
    permissions: ['geolocation']
});

test('Follow up on submitted report using Report Key + Password',
    async ({ page, submittedReport }) => {

        const followUpPage = new FollowUpPage(page);
        await page.goto('/');
        await followUpPage.clickFollowupButton();
        await followUpPage.enterReportKey(submittedReport.reportKey);

        await followUpPage.enterPassword(submittedReport.password);

        await followUpPage.clickAccessReport();

        await followUpPage.verifyReportDetails(submittedReport.data);
        
        await followUpPage.enterMessage(submittedReport.data.message);

        await followUpPage.clickSendMessage();

        await followUpPage.verifyMessageAdded();

        // Verify submitted message
        await followUpPage.verifyMessageDetails(submittedReport.data.message);

    }

);