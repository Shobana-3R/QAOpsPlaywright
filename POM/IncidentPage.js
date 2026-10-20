const {test, expect} = require('@playwright/test');
class IncidentPage {

        constructor(page) {
        this.page = page

        this.incidentAnonymous =  page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/input')
        this.incidentIdentity =  page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[1]/button[2]')
        this.identityName = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/input')
        this.identityEmail = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[2]/input')
        this.identityPhone = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[3]/input')
        this.incidentDate = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[1]/input')
        this.incidentLocation = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[2]/div[2]/input')
        this.incidentDescription = page.locator( "//textarea[@placeholder='Describe what happened in detail (minimum 10 characters)...']")
        this.personsInvolved = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[4]/div[1]/textarea')
        this.incidentWitnesses = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[4]/div[2]/textarea')
        this.incidentAddlinfo = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[1]/div[5]/textarea')
        this.attachEvidence =  page.locator("input[type='file']")
        this.continueButton = page.locator('//*[@id="root"]/div/div[2]/div/div[3]/div[2]/button[2]')
        }

async clickIncidentAnonymous() {
    await this.incidentAnonymous.click()
}
async clickIncidentIdentity() {
    await this.incidentIdentity.click()
}
async enterIncidentIdentity(name, email, phone) {
        await this.identityName.fill(name)
        await this.identityEmail.fill(email)
        await this.identityPhone.fill(phone)
}
async enterIncidentDate(date) {
        await this.incidentDate.fill(date)
}
async enterIncidentLocation(location) {
        await this.incidentLocation.fill(location)
}
async enterIncidentDescription(description) {
        await this.incidentDescription.fill(description)
}
async enterPersonsInvolved(persons) {
        await this.personsInvolved.fill(persons)
}
async enterIncidentWitnesses(witnesses) {
        await this.incidentWitnesses.fill(witnesses)
}
async enterAdditionalInformation(addlinfo) {
        await this.incidentAddlinfo.fill(addlinfo)
}
async uploadEvidence(filePath) {
        await this.attachEvidence.setInputFiles(filePath);
}
async clickContinue() {
        await this.continueButton.click();
    }
}

module.exports = {IncidentPage}