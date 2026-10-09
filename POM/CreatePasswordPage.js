const { test, expect } = require('@playwright/test');
class CreatePasswordPage {

    constructor(page) {
        this.page = page

        this.followupPw = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div/div[1]/input')
        this.confirmPw = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div/div[2]/input')
        this.submitButton = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[2]/button[2]')

    }
    async enterFollowupPw(password) {
        await this.followupPw.fill(password)
    }
    async enterConfirmPw(password) {
        await this.confirmPw.fill(password)
    }
    async clickSubmit() {
        await this.submitButton.click()
    }

}

module.exports = { CreatePasswordPage }