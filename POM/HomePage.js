const {test, expect} = require('@playwright/test');
class HomePage {

    constructor(page) {
        this.page = page;

        this.fileReportButton = page.getByRole('button', { name: 'File a Report' });
    }

    async clickFileReport() {
        await this.fileReportButton.click();
    }

}

module.exports = { HomePage };