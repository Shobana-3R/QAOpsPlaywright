const { expect } = require('@playwright/test');

class TrustReportPage {

    constructor(page) {

        this.page = page;

        // Trust Report navigation
        this.trustReportButton =
            page.locator(
                '//*[@id="root"]/div/div[2]/header/div/nav/a[1]'
            );


        // Statistics values

        this.reportsReceived =
            page.locator(
                "//p[normalize-space()='Reports Received']/following-sibling::p[1]"
            );

        this.casesResolved =
            page.locator(
                "//p[normalize-space()='Cases Resolved']/following-sibling::p[1]"
            );

        this.underReview =
            page.locator(
                "//p[normalize-space()='Currently Under Review']/following-sibling::p[1]"
            );

        this.resolvedThisMonth =
            page.locator(
                "//p[normalize-space()='Resolved This Month']/following-sibling::p[1]"
            );

this.resolutionRate =
    page.locator(
        "//p[contains(normalize-space(), '%')]"
    ).first();
this.topicsCovered =
    page.locator(
        "//p[normalize-space()='Topics Covered']/following-sibling::p[1]"
    );
    }


    // --------------------------------------------------
    // Navigation
    // --------------------------------------------------

    async clickTrustReport() {

        await this.trustReportButton.click();

    }


    // --------------------------------------------------
    // Verify Reports Received
    // --------------------------------------------------

    async verifyReportsReceived(expected) {

        await expect(this.reportsReceived)
            .toHaveText(String(expected));

    }


    // --------------------------------------------------
    // Verify Cases Resolved
    // --------------------------------------------------

    async verifyCasesResolved(expected) {

        await expect(this.casesResolved)
            .toHaveText(String(expected));

    }


    // --------------------------------------------------
    // Verify Under Review
    // --------------------------------------------------

    async verifyUnderReview(expected) {

        await expect(this.underReview)
            .toHaveText(String(expected));

    }


    // --------------------------------------------------
    // Verify Resolved This Month
    // --------------------------------------------------

    async verifyResolvedThisMonth(expected) {

        await expect(this.resolvedThisMonth)
            .toHaveText(String(expected));

    }


    // --------------------------------------------------
    // Verify Resolution Rate
    // --------------------------------------------------

async verifyResolutionRate(expected) {
    await expect(this.resolutionRate)
        .toHaveText(`${expected}%`);
}


    // --------------------------------------------------
    // Verify Topics Covered
    // --------------------------------------------------

    async verifyTopicsCovered(
        categoriesEngaged,
        categoriesTotal
    ) {

        await expect(this.topicsCovered)
            .toContainText(
                `${categoriesEngaged}/${categoriesTotal}`
            );

    }

}

module.exports = { TrustReportPage };