const { test, expect } = require('@playwright/test');
class TermsPage {

        constructor(page) {
        this.page = page;

        this.acceptTerms = page.getByRole('checkbox', 
        {name: 'I have read and agree to the Terms and Conditions.'})
        this.continueButton = page.getByRole('button',
        { name: 'Continue' }
        );

}

async checkTerms() {
    await this.acceptTerms.check()
}

    async clickContinue() {
        await this.continueButton.click();
    }
}

module.exports = { TermsPage }