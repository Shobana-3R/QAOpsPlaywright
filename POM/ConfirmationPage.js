class ConfirmationPage
{
    constructor(page)
    {
        this.page = page;
        this.reportKey = page.locator('//*[@id="root"]/div/div[2]/div/div/div[2]/div/code');
    }

    async getReportKey()
    {
        return (await this.reportKey.textContent()).trim()
    }
}

module.exports = { ConfirmationPage };