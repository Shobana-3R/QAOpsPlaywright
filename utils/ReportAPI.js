class ReportApi {

    constructor(request) {
        this.request = request;
        this.baseURL = process.env.BASE_URL;
    }

    

    async getReport(reportId) {

        return await this.request.get(
             `${this.baseURL}/api/admin/reports/${reportId}`
        );

    }


    async sendAdminMessage(reportId, message) {

        return await this.request.post(
             `${this.baseURL}/api/admin/reports/${reportId}/message`,
            {
                data: {
                    message: message
                }
            }
        );

    }


    async getReports() {

        return await this.request.get(
             `${this.baseURL}/api/admin/reports`
        );

    }


    async getTrustReportStats() {

        return await this.request.get(
             `${this.baseURL}/api/public/stats`,
              {
            headers: {
                Accept: 'application/json'
            }
        }
        );

    }

}

module.exports = { ReportApi };