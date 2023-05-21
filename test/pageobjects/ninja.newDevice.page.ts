import { expect } from "chai";
import Page from "./page.js";
import Utils from "../helpers/utils.js";

const device: string = `${await Utils.randomDevice()}-PC`;
const hddCapacity: number = await Utils.generateRandomNumber();
const addDeviceUrl: string = "http://localhost:3001/devices/add";

class NewDevice extends Page {
    /**
     * define elements
     */

    get systemName() {
        return $("[id='system_name']");
    }

    get type() {
        return $("[id='type']");
    }

    get hddCapacity() {
        return $("[id='hdd_capacity']");
    }

    get saveButton() {
        return $("[class='submitButton']");
    }

    /**
     * define or overwrite page methods
     */
    async checkAddDeviceUrl() {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(addDeviceUrl);
    }

    async inputNewSystemName() {
        await Utils.setValue(await this.systemName, device, "System Name");
    }

    async chooseTypeOption() {
        await Utils.dropdown(await this.type, "MAC", "TYPE");
    }

    async inputHddCapacity() {
        const hddCapacityToString = hddCapacity.toString();
        await Utils.setValue(
            await this.hddCapacity,
            hddCapacityToString,
            "HDD Capacity"
        );
    }

    async clickSaveButton() {
        await Utils.click(await this.saveButton, "Save Button");
    }

    async createNewDevice() {
        await this.checkAddDeviceUrl();
        await this.inputNewSystemName();
        await this.chooseTypeOption();
        await this.inputHddCapacity();
        await this.clickSaveButton();
    }
}

export default new NewDevice();
