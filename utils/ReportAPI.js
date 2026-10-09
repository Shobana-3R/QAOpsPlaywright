class ReportApi {

    constructor(request) {
        this.request = request;
    }


    async getReport(reportId) {

        return await this.request.get(
            `https://concern-vault.emergent.host/api/admin/reports/${reportId}`
        );

    }


    async sendAdminMessage(reportId, message) {

        return await this.request.post(
            `https://concern-vault.emergent.host/api/admin/reports/${reportId}/message`,
            {
                data: {
                    message: message
                }
            }
        );

    }


    async getReports() {

        return await this.request.get(
            'https://concern-vault.emergent.host/api/admin/reports'
        );

    }


    async getTrustReportStats() {

        return await this.request.get(
            'https://concern-vault.emergent.host/api/public/stats'
        );

    }

}

module.exports = { ReportApi };