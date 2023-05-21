import ServerCall from "../pageobjects/server.page.js";
import HomePage from "../pageobjects/ninja.home.page.js";
import NewDevice from "../pageobjects/ninja.newDevice.page.js";

describe("Verify that devices can be created properly using the UI.", () => {
    it("Create new device with name, type and capacity.", async () => {
        await ServerCall.open();
        await HomePage.clickAddDevice();
        await NewDevice.createNewDevice();
    });

    it("Verify the new device is now visible. Check name, type and capacity are visible.", async () => {
        await HomePage.checkDeviceComponentDisplayedAfterAddDevice();
        await NewDevice.checkTheNewDevice();
    });
});
