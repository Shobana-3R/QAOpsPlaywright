# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\tc1-3-reportSubmission.spec.js >> Anonymous Report Submission - Initech LLC for Retaliation
- Location: tests\ui\tc1-3-reportSubmission.spec.js:21:6

# Error details

```
TypeError: incidentPage.uploadEvidence is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - link "NAVEX EthicsPoint®" [ref=e7] [cursor=pointer]:
          - /url: /
          - generic [ref=e11]:
            - generic [ref=e12]: NAVEX
            - generic [ref=e13]: EthicsPoint®
        - navigation [ref=e14]:
          - link "Trust Report" [ref=e15] [cursor=pointer]:
            - /url: /trust
          - link "Follow up on a report" [ref=e16] [cursor=pointer]:
            - /url: /follow-up
          - link "Admin" [ref=e17] [cursor=pointer]:
            - /url: /admin/login
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]: Organization
        - generic [ref=e29]: Category
        - generic [ref=e35]: Terms
        - generic [ref=e41]:
          - generic [ref=e42]: "4"
          - generic [ref=e43]: Details
        - generic [ref=e45]:
          - generic [ref=e46]: "5"
          - generic [ref=e47]: Password
      - generic [ref=e48]: Location not shared (User denied Geolocation) — your anonymity is preserved either way
      - generic [ref=e52]:
        - generic [ref=e53]:
          - paragraph [ref=e54]: Step 04
          - heading "Describe the Incident" [level=2] [ref=e55]
          - generic [ref=e56]:
            - button [ref=e57] [cursor=pointer]:
              - generic [ref=e63]:
                - paragraph [ref=e64]: Anonymous
                - paragraph [ref=e65]: Do not share my identity
            - button [ref=e66] [cursor=pointer]:
              - generic [ref=e71]:
                - paragraph [ref=e72]: Self-identify
                - paragraph [ref=e73]: Provide my contact details
          - generic [ref=e74]:
            - generic [ref=e75]:
              - text: Incident Date
              - textbox [ref=e76]: 2026-09-09
            - generic [ref=e77]:
              - text: Incident Location
              - textbox "City, floor, department..." [ref=e78]: Bangalore Office, 3rd Floor
          - generic [ref=e79]:
            - generic [ref=e80]: Description *
            - textbox "Describe what happened in detail (minimum 10 characters)..." [ref=e81]: stolen assets
          - generic [ref=e82]:
            - generic [ref=e83]:
              - text: Persons Involved
              - textbox [ref=e84]: Wang Lee, John Mac
            - generic [ref=e85]:
              - text: Witnesses
              - textbox [ref=e86]: Tony Guy
          - generic [ref=e87]:
            - text: Additional Information
            - textbox [active] [ref=e88]: Take action asap
          - generic [ref=e89]:
            - text: Evidence Attachments (optional)
            - button [ref=e92] [cursor=pointer]:
              - paragraph [ref=e96]: Click to attach evidence or drag files here
              - paragraph [ref=e97]: Images or PDF · up to 5 files · max 10 MB each
        - generic [ref=e98]:
          - button "Back" [ref=e99] [cursor=pointer]
          - button "Continue" [ref=e100] [cursor=pointer]
  - region "Notifications alt+T"
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const path = require('path');
  3   | const { HomePage } = require('../../POM/HomePage');
  4   | const { ReportPage } = require('../../POM/ReportPage');
  5   | const { ViolationPage } = require('../../POM/ViolationPage');
  6   | const { TermsPage } = require('../../POM/TermsPage');
  7   | const { IncidentPage } = require('../../POM/IncidentPage');
  8   | const { CreatePasswordPage } = require('../../POM/CreatePasswordPage')
  9   | const { ConfirmationPage } = require('../../POM/ConfirmationPage')
  10  | 
  11  | const testData = require('../../testdata/reportData.json')
  12  | const evidencePath = path.resolve(
  13  |   process.cwd(),
  14  |   'testdata',
  15  |   'evidence.png'
  16  | )
  17  | 
  18  | for(const data of testData) {
  19  | 
  20  | 
  21  | test.only(`Anonymous Report Submission - ${data.organization} for ${data.violation}`, async ({ page }) => {
  22  | 
  23  |     const homePage = new HomePage(page);
  24  |     const reportPage = new ReportPage(page);
  25  |     const violationPage = new ViolationPage(page);
  26  |     const termsPage = new TermsPage(page)
  27  |     const incidentPage = new IncidentPage(page)
  28  |     const createpasswordPage = new CreatePasswordPage(page)
  29  |     const confirmationPage = new ConfirmationPage(page)
  30  | 
  31  |     await page.goto('/');
  32  | 
  33  |     await expect(
  34  |     page.getByRole('button', { name: 'File a Report' })
  35  |     ).toBeVisible();
  36  | 
  37  |     await homePage.clickFileReport();
  38  | 
  39  |     await reportPage.enterOrganization(data.organization)
  40  |     await reportPage.selectOrganization(data.organization);
  41  |     await expect(page.locator('p').filter({ hasText: 'Selected' })
  42  |     ).toContainText(data.organization);
  43  |     await reportPage.clickContinue()
  44  | 
  45  |     await violationPage.selectViolation(data.violation)
  46  |     await violationPage.clickContinue()
  47  | 
  48  |     await termsPage.checkTerms()
  49  |     await termsPage.clickContinue()
  50  | 
  51  |     await incidentPage.clickIncidentAnonymous()
  52  |     await incidentPage.enterIncidentDate(data.date)
  53  |     await incidentPage.enterIncidentLocation(data.location)
  54  |     await incidentPage.enterIncidentDescription(data.description)
  55  |     await incidentPage.enterPersonsInvolved(data.persons)
  56  |     await incidentPage.enterIncidentWitnesses(data.witnesses)
  57  |     await incidentPage.enterAdditionalInformation(data.addlinfo)
> 58  |     await incidentPage.uploadEvidence(evidencePath)
      |                        ^ TypeError: incidentPage.uploadEvidence is not a function
  59  |     await expect(page.getByText("evidence.png")).toBeVisible()
  60  |     await incidentPage.clickContinue()
  61  | 
  62  |     await createpasswordPage.enterFollowupPw(data.password)
  63  |     await createpasswordPage.enterConfirmPw(data.password)
  64  |     await createpasswordPage.clickSubmit()
  65  |     
  66  |     const reportKey = await confirmationPage.getReportKey(); 
  67  |     console.log(`Generated Report Key - ${data.organization} for ${data.violation}:`, reportKey);
  68  | })}
  69  | 
  70  | 
  71  | test('TC03 Validate mandatory fields / negative scenarios' , async ({ page }) => {
  72  | 
  73  |     const homePage = new HomePage(page);
  74  |     const reportPage = new ReportPage(page);
  75  |     const violationPage = new ViolationPage(page);
  76  |     const termsPage = new TermsPage(page)
  77  |     const incidentPage = new IncidentPage(page)
  78  |     const createpasswordPage = new CreatePasswordPage(page)
  79  |     const confirmationPage = new ConfirmationPage(page)
  80  |     const data = testData[0]
  81  |     await page.goto('/');
  82  | //assertion
  83  |     await expect(page.getByRole('button', { name: 'File a Report' })).toBeVisible();
  84  | 
  85  |     await homePage.clickFileReport();
  86  | //assertion
  87  |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
  88  |     await reportPage.enterOrganization(data.organization)
  89  |     await reportPage.selectOrganization(data.organization);
  90  | //assertion
  91  |     await expect(page.locator('p').filter({ hasText: 'Selected' })).toContainText(data.organization);
  92  |     await reportPage.clickContinue()
  93  | //assertion
  94  |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
  95  |     await violationPage.selectViolation(data.violation)
  96  |     await violationPage.clickContinue()
  97  | //assertion
  98  |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
  99  |     await termsPage.checkTerms()
  100 |     await termsPage.clickContinue()
  101 | //assertion
  102 |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(); 
  103 |     await incidentPage.clickIncidentIdentity()
  104 |     await incidentPage.enterIncidentDescription('10 less')
  105 | //assertion
  106 |     await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled(); 
  107 |     await incidentPage.enterIncidentDescription(data.description)
  108 |     await incidentPage.clickContinue()
  109 | //assertion
  110 |     await expect(page.getByRole('button', { name: 'Submit Report' })).toBeDisabled()
  111 |     await createpasswordPage.enterFollowupPw(data.password)
  112 |     await createpasswordPage.enterConfirmPw(data.password)
  113 |     await createpasswordPage.clickSubmit()
  114 |     
  115 |     const reportKey = await confirmationPage.getReportKey(); 
  116 |     console.log(`Generated Report Key - ${data.organization} for ${data.violation}:`, reportKey);
  117 | })
```