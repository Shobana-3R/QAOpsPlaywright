const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../POM/HomePage');
const { ReportPage } = require('../../POM/ReportPage');


test.describe('Geolocation - Permission Granted', () => {

    test.use({
        permissions: ['geolocation'],
        geolocation: {
            latitude: 12.973,
            longitude: 80.252
        }
    });

    test('Verify geolocation when permission is granted', async ({ page }) => {

        const homePage = new HomePage(page);
        const reportPage = new ReportPage(page);

        await page.goto('/');

        await expect(
            page.getByRole('button', { name: 'File a Report' })
        ).toBeVisible();

        await homePage.clickFileReport();

        const locationText =
            await reportPage.getLocationCapturedText();

        console.log('Location displayed:', locationText);

        expect(locationText).toContain('12.973');
        expect(locationText).toContain('80.252');
    });
});


test.describe('Geolocation - Permission Denied', () => {

    test.use({
        permissions: []
    });

    test('Verify geolocation when permission is denied', async ({ page }) => {

        const homePage = new HomePage(page);
        const reportPage = new ReportPage(page);

        await page.goto('/');

        await expect(
            page.getByRole('button', { name: 'File a Report' })
        ).toBeVisible();

        await homePage.clickFileReport();

        const locationText =
            await reportPage.getLocationDeniedText();

        console.log('Location displayed:', locationText);

        expect(locationText).toContain('Location not shared');
        expect(locationText).toContain('User denied Geolocation');
    });
});