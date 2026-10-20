
const { test, expect } = require('@playwright/test');

const { ReportApi } = require('../../utils/ReportAPI');

test(
    'Validate Trust Report statistics only API',
    async ({ request }) => {

        // 1. Initialize API class
        const reportApi = new ReportApi(request);

        // 2. Get Trust Report statistics
        const response = await reportApi.getTrustReportStats();
        console.log('Status:', response.status());
        console.log('URL:', response.url());
        console.log('Content-Type:', response.headers()['content-type']);

        const body = await response.text();
        console.log('Response body:', body.substring(0, 1000));

        // 3. Validate response status
        expect(response.status()).toBe(200);

        // 4. Read response body
        const apiData = await response.json();

        console.log(
            'Trust Report Statistics:',
            JSON.stringify(apiData, null, 2)
        );

        // 5. Validate required fields exist
        expect(apiData.total_reports).toBeDefined();
        expect(apiData.resolved).toBeDefined();
        expect(apiData.under_review).toBeDefined();
        expect(apiData.resolved_this_month).toBeDefined();
        expect(apiData.categories_engaged).toBeDefined();
        expect(apiData.categories_total).toBeDefined();
        expect(apiData.resolution_rate).toBeDefined();

        // 6. Validate data types
        expect(typeof apiData.total_reports).toBe('number');
        expect(typeof apiData.resolved).toBe('number');
        expect(typeof apiData.under_review).toBe('number');
        expect(typeof apiData.resolved_this_month).toBe('number');
        expect(typeof apiData.categories_engaged).toBe('number');
        expect(typeof apiData.categories_total).toBe('number');
        expect(typeof apiData.resolution_rate).toBe('number');

    }
);
