const { test: base, expect } = require('@playwright/test');

const { HomePage } = require('../POM/HomePage');
const { ReportPage } = require('../POM/ReportPage');
const { ViolationPage } = require('../POM/ViolationPage');
const { TermsPage } = require('../POM/TermsPage');
const { IncidentPage } = require('../POM/IncidentPage');
const { CreatePasswordPage } = require('../POM/CreatePasswordPage');
const { ConfirmationPage } = require('../POM/ConfirmationPage');

const testData = require('../testdata/reportData.json');

const test = base.extend({

    submittedReport: async ({ page }, use) => {

        // For now, use the first test data set
        const data = testData[1];

        const homePage = new HomePage(page);
        const reportPage = new ReportPage(page);
        const violationPage = new ViolationPage(page);
        const termsPage = new TermsPage(page);
        const incidentPage = new IncidentPage(page);
        const createpasswordPage = new CreatePasswordPage(page);
        const confirmationPage = new ConfirmationPage(page);

        await page.goto('/');

        await expect(
            page.getByRole('button', { name: 'File a Report' })
        ).toBeVisible();

        await homePage.clickFileReport();

        // Organization
        await reportPage.enterOrganization(data.organization);
        await reportPage.selectOrganization(data.organization);
        await reportPage.clickContinue();

        // Violation
        await violationPage.selectViolation(data.violation);
        await violationPage.clickContinue();

        // Terms
        await termsPage.checkTerms();
        await termsPage.clickContinue();

        // Incident
        await incidentPage.clickIncidentAnonymous();
        await incidentPage.enterIncidentDate(data.date);
        await incidentPage.enterIncidentLocation(data.location);
        await incidentPage.enterIncidentDescription(data.description);
        await incidentPage.enterPersonsInvolved(data.persons);
        await incidentPage.enterIncidentWitnesses(data.witnesses);
        await incidentPage.enterAdditionalInformation(data.addlinfo);
        await incidentPage.uploadEvidence(data.evidence);

        await expect(
            page.getByText('evidence.png')
        ).toBeVisible();

        await incidentPage.clickContinue();

        // Password
        await createpasswordPage.enterFollowupPw(data.password);
        await createpasswordPage.enterConfirmPw(data.password);
        await createpasswordPage.clickSubmit();

        // report key dynamically captured
        const reportKey = await confirmationPage.getReportKey();

        console.log('Generated Report Key:', reportKey);

        // this will be available in test
        await use({
            reportKey,
            password: data.password,
            data
        });
    }
});

module.exports = { test };