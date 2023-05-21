import { expect } from "chai";
import Page from "./page.js";
import ApiResponses from "../helpers/apiResponses.js";

const baseUrl: string = "http://localhost:3000";
const endpoint: string = "/devices/";
const statusCode: number = 200;
let numberOfIds: number = await ApiResponses.getTheNumberOfIds(
    baseUrl,
    endpoint,
    statusCode
);

class HomePage extends Page {
    /**
     * define elements
     */
    get deviceName() {
        return $$("[class='device-name']");
    }

    /**
     * define or overwrite page methods
     */
    async checkingDeviceNameDisplayed() {
        const deviceElements = await this.deviceName;
        const deviceNames = [];

        for (const deviceElement of deviceElements) {
            const deviceName = await deviceElement.getText();
            deviceNames.push(deviceName);
        }

        deviceNames.sort();

        return deviceNames;
    }

    async checkingElementIsCorrectlyDisplayed(elementName: string) {
        const elements = await $$(`[class='${elementName}']`);
        const values: string[] = await Promise.all(
            elements.map((element) => element.getText())
        );
        const numberOfValues = values.length;
        const valuesString = values.join(", ");

        console.log(
            `--- ${elementName} Values obtained through UI: ${numberOfValues}: --> Data: ${valuesString}`
        );
        expect(numberOfValues).to.equal(numberOfIds);
        expect(values.every((value) => typeof value === "string")).to.be.true;
    }

    async checkingEditAndRemoveButtons(elementName: string) {
        const elements = await $$(`[class='${elementName}']`);

        await this.checkingElementIsCorrectlyDisplayed(elementName);

        for (const element of elements) {
            expect(await element.isClickable()).to.be.true;
            expect(await element.isDisplayed()).to.be.true;
            expect(await element.isEnabled()).to.be.true;
        }
    }
}

export default new HomePage();
