// You can use this class from any test or page within the framework

import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

class ApiResponses {
    /**
     * Retrieves the system names from a JSON file.
     *
     * @param {string} baseUrl - The base URL of the API.
     * @param {string} endpoint - The API endpoint to retrieve the JSON file.
     * @param {number} statusCode - The expected status code of the API response.
     * @returns {Promise<string[]>} A promise that resolves to an array of system names.
     */
    static async getSystemNamesFromApiJsonResponse(
        baseUrl: string,
        endpoint: string,
        statusCode: number
    ): Promise<string[]> {
        let systemNames: string[] = [];
        const response = await chai.request(baseUrl).get(endpoint);
        await expect(response).to.have.status(statusCode);
        const devices = response.body;
        console.log(devices);
        systemNames = devices.map(
            (device: { system_name: string[] }) => device.system_name
        );

        systemNames = systemNames.flat();
        systemNames.sort();
        return systemNames;
    }

    /**
     * Retrieves the number of IDs from the API response.
     *
     * @param {string} baseUrl - The base URL of the API.
     * @param {string} endpoint - The API endpoint.
     * @param {number} statusCode - The expected HTTP status code for the response.
     * @returns {Promise<number>} The number of IDs present in the API response.
     */
    static async getTheNumberOfIds(
        baseUrl: string,
        endpoint: string,
        statusCode: number
    ): Promise<number> {
        let numberOfIds: number;
        const response = await chai.request(baseUrl).get(endpoint);
        await expect(response).to.have.status(statusCode);
        const devices = response.body;
        numberOfIds = devices.length;

        console.log(`--- Number of Devices: ${numberOfIds}`);
        return numberOfIds;
    }
}

export default ApiResponses;
