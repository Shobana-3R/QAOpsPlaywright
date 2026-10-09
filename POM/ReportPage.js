const { test, expect } = require('@playwright/test');
class ReportPage {

    constructor(page) {
        this.page = page;

        this.organizationInput = page.getByPlaceholder(
            'e.g. Acme Corporation'
        );

        this.organizationList = page.getByTestId(
            'org-suggestions'
        );

        this.continueButton = page.getByRole(
            'button',
            { name: 'Continue' }
        );

        this.locationCaptured = page.locator(
            "//div[@data-testid='geolocation-indicator' and contains(., 'Location captured:')]"
        );

        this.locationDenied = page.locator(
            "//div[@data-testid='geolocation-indicator' and contains(., 'User denied Geolocation')]"
        );
    }

    async enterOrganization(organization) {
        await this.organizationInput.fill(organization);
    }

    async selectOrganization(organization) {
        await this.organizationList
            .getByText(organization, { exact: true })
            .click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }
    async getLocationCapturedText() {
        return await this.locationCaptured.textContent();
    }

    async getLocationDeniedText() {
        return await this.locationDenied.textContent();
    }

}

module.exports = { ReportPage };