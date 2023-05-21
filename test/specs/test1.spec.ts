import { expect } from "chai";
import ApiCall from "../pageobjects/apiCall.page.js";
import HomePage from "../pageobjects/ninja.home.page.js";
import ApiResponses from "../helpers/apiResponses.js";

const baseUrl: string = "http://localhost:3000";
const endpoint: string = "/devices/";
const statusCode: number = 200;
const systemNames: string[] =
    await ApiResponses.getSystemNamesFromApiJsonResponse(
        baseUrl,
        endpoint,
        statusCode
    );

const device = {
    labelName: "device-name",
    labelType: "device-type",
    labelCapacity: "device-capacity",
    buttonEdit: "device-edit",
    buttonRemove: "device-remove",
};

describe("Make an API call to retrieve the list of devices and check it on the UI.", () => {
    it("check deviceName on the web page and API response are the same.", async () => {
        await ApiCall.open();
        console.log(`--- DeviceNames from API: ${systemNames}`);
        console.log(
            `--- DeviceNames from UI: ${await HomePage.checkingDeviceNameDisplayed()}`
        );
        // Checking deviceName from API and UI are the same with chai(expect) library
        expect(await HomePage.checkingDeviceNameDisplayed()).to.deep.members(
            systemNames
        );
    });

    it("Check the name, type and capacity of each element and Correctly Displayed.", async () => {
        await HomePage.checkingElementIsCorrectlyDisplayed(device.labelName);
        await HomePage.checkingElementIsCorrectlyDisplayed(device.labelType);
        await HomePage.checkingElementIsCorrectlyDisplayed(
            device.labelCapacity
        );
    });

    it("Verify that all devices contain the edit and delete buttons.", async () => {
        await HomePage.checkingEditAndRemoveButtons(device.buttonEdit);
        await HomePage.checkingEditAndRemoveButtons(device.buttonRemove);
    });
});
