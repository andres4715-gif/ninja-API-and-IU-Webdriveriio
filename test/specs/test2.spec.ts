import { expect } from "chai";
import ServerCall from "../pageobjects/server.page.js";
import HomePage from "../pageobjects/ninja.home.page.js";
import NewDevice from "../pageobjects/ninja.newDevice.page.js";

describe("Verify that devices can be created properly using the UI.", () => {
    it("Verify the new device is now visible. Check name, type and capacity are visible.", async () => {
        await ServerCall.open();
        await HomePage.clickAddDevice();
        await NewDevice.createNewDevice();
        await HomePage.checkDeviceComponentDisplayedAfterAddDevice();
    });
});
