const { test, expect } = require('@playwright/test');
const path = require('path');
const { HomePage } = require('../../POM/HomePage');
const { ReportPage } = require('../../POM/ReportPage');
const { ViolationPage } = require('../../POM/ViolationPage');
const { TermsPage } = require('../../POM/TermsPage');
const { IncidentPage } = require('../../POM/IncidentPage');
const { CreatePasswordPage } = require('../../POM/CreatePasswordPage')
const { ConfirmationPage } = require('../../POM/ConfirmationPage')

const testData = require('../../testdata/reportData.json')
const evidencePath = path.resolve(
  process.cwd(),
  'testdata',
  'evidence.png'
)

for(const data of testData) {


test.only(`Anonymous Report Submission - ${data.organization} for ${data.violation}`, async ({ page }) => {

    const homePage = new HomePage(page);
    const reportPage = new ReportPage(page);
    const violationPage = new ViolationPage(page);
    const termsPage = new TermsPage(page)
    const incidentPage = new IncidentPage(page)
    const createpasswordPage = new CreatePasswordPage(page)
    const confirmationPage = new ConfirmationPage(page)

    await page.goto('/');

    await expect(
    page.getByRole('button', { name: 'File a Report' })
    ).toBeVisible();

    await homePage.clickFileReport();

    await reportPage.enterOrganization(data.organization)
    await reportPage.selectOrganization(data.organization);
    await expect(page.locator('p').filter({ hasText: 'Selected' })
    ).toContainText(data.organization);
    await reportPage.clickContinue()

    await violationPage.selectViolation(data.violation)
    await violationPage.clickContinue()

    await termsPage.checkTerms()
    await termsPage.clickContinue()

    await incidentPage.clickIncidentAnonymous()
    await incidentPage.enterIncidentDate(data.date)
    await incidentPage.enterIncidentLocation(data.location)
    await incidentPage.enterIncidentDescription(data.description)
    await incidentPage.enterPersonsInvolved(data.persons)
    await incidentPage.enterIncidentWitnesses(data.witnesses)
    await incidentPage.enterAdditionalInformation(data.addlinfo)
    await incidentPage.uploadEvidence(evidencePath)
    await expect(page.getByText("evidence.png")).toBeVisible()
    await incidentPage.clickContinue()

    await createpasswordPage.enterFollowupPw(data.password)
    await createpasswordPage.enterConfirmPw(data.password)
    await createpasswordPage.clickSubmit()
    
    const reportKey = await confirmationPage.getReportKey(); 
    console.log(`Generated Report Key - ${data.organization} for ${data.violation}:`, reportKey);
})}


test('TC03 Validate mandatory fields / negative scenarios' , async ({ page }) => {

    const homePage = new HomePage(page);
    const reportPage = new ReportPage(page);
    const violationPage = new ViolationPage(page);
    const termsPage = new TermsPage(page)
    const incidentPage = new IncidentPage(page)
    const createpasswordPage = new CreatePasswordPage(page)
    const confirmationPage = new ConfirmationPage(page)
    const data = testData[0]
    await page.goto('/');
//assertion
    await expect(page.getByRole('button', { name: 'File a Report' })).toBeVisible();

    await homePage.clickFileReport();
//assertion
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await reportPage.enterOrganization(data.organization)
    await reportPage.selectOrganization(data.organization);
//assertion
    await expect(page.locator('p').filter({ hasText: 'Selected' })).toContainText(data.organization);
    await reportPage.clickContinue()
//assertion
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await violationPage.selectViolation(data.violation)
    await violationPage.clickContinue()
//assertion
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    await termsPage.checkTerms()
    await termsPage.clickContinue()
//assertion
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(); 
    await incidentPage.clickIncidentIdentity()
    await incidentPage.enterIncidentDescription('10 less')
//assertion
    await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(); 
    await incidentPage.enterIncidentDescription(data.description)
    await incidentPage.clickContinue()
//assertion
    await expect(page.getByRole('button', { name: 'Submit Report' })).toBeDisabled()
    await createpasswordPage.enterFollowupPw(data.password)
    await createpasswordPage.enterConfirmPw(data.password)
    await createpasswordPage.clickSubmit()
    
    const reportKey = await confirmationPage.getReportKey(); 
    console.log(`Generated Report Key - ${data.organization} for ${data.violation}:`, reportKey);
})