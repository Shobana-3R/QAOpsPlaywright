const { test, expect } = require('@playwright/test');

const { TrustReportPage } =
    require('../../POM/TrustReportPage');

const { ReportApi } =
    require('../../utils/ReportAPI');


test(
    'TC10 - Trust Report statistics match backend report data',
    async ({ page }) => {

        // --------------------------------------------------
        // 1. Initialize Page Objects and API
        // --------------------------------------------------

        const trustReportPage =
            new TrustReportPage(page);

        const reportApi =   
            new ReportApi(page.request);


        // --------------------------------------------------
        // 2. Open application
        // --------------------------------------------------

        await page.goto('/');


        // --------------------------------------------------
        // 3. Open Trust Report
        // --------------------------------------------------

        await trustReportPage.clickTrustReport();


        // --------------------------------------------------
        // 4. Get Trust Report statistics from API
        // --------------------------------------------------

        const response =
            await reportApi.getTrustReportStats();

        expect(response.status()).toBe(200);


        const apiData =
            await response.json();


        // --------------------------------------------------
        // 5. Validate API response
        // --------------------------------------------------

        expect(apiData.total_reports).toBeDefined();

        expect(apiData.resolved).toBeDefined();

        expect(apiData.under_review).toBeDefined();

        expect(apiData.resolved_this_month).toBeDefined();

        expect(apiData.categories_engaged).toBeDefined();

        expect(apiData.categories_total).toBeDefined();

        expect(apiData.resolution_rate).toBeDefined();


        // --------------------------------------------------
        // 6. Validate UI against API
        // --------------------------------------------------

        await trustReportPage.verifyReportsReceived(
            apiData.total_reports
        );


        await trustReportPage.verifyCasesResolved(
            apiData.resolved
        );


        await trustReportPage.verifyUnderReview(
            apiData.under_review
        );


        await trustReportPage.verifyResolvedThisMonth(
            apiData.resolved_this_month
        );


await trustReportPage.verifyResolutionRate(
    apiData.resolution_rate
);


        await trustReportPage.verifyTopicsCovered(
            apiData.categories_engaged,
            apiData.categories_total
        );

    }
);