import { expect } from "chai";
import "chai-asserttype";
import Page from "./page.js";
import Utils from "../helpers/utils.js";

const device: string = `${await Utils.randomDevice()}-PC`;
const type: string = "MAC";
const hddCapacity: number = await Utils.generateRandomNumber();
const addDeviceUrl: string = "http://localhost:3001/devices/add";
let iteration: number = 0;

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

    get devicesList() {
        return $$('[class="device-info"]');
    }

    /**
     * define or overwrite page methods
     */
    async inputNewSystemName() {
        await Utils.setValue(await this.systemName, device, "System Name");
    }

    async chooseTypeOption() {
        await Utils.dropdown(await this.type, type, "TYPE");
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
        await Utils.checkUrl(addDeviceUrl);
        await this.inputNewSystemName();
        await this.chooseTypeOption();
        await this.inputHddCapacity();
        await this.clickSaveButton();
    }

    async checkTheNewDevice() {
        const elements = this.devicesList;
        let capacity = hddCapacity.toString();

        const foundElement = await elements.find(async (element) => {
            const text = await element.getText();
            iteration++;
            console.log(`--- Obtained Device: ${iteration} \n${text}`);
            return (
                text.includes(device) &&
                text.includes(type) &&
                text.includes(capacity)
            );
        });

        expect(foundElement).to.exist;
    }
}

export default new NewDevice();
