const { test, expect } = require('@playwright/test');
class ViolationPage {

    constructor(page) {
        this.page = page;

        this.violationCategory = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div').locator('button');

        this.continueButton = page.getByRole(
            'button',
            { name: 'Continue' }
        );

}

async selectViolation(violation) {
    await this.violationCategory.getByText
    (violation, {exact:true})
    .click();
}

    async clickContinue() {
        await this.continueButton.click();
    }
}

module.exports = { ViolationPage }