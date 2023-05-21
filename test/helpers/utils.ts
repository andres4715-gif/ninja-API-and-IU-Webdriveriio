// You can use this class from any test or page within the framework
import { expect } from "chai";

class Utils {
    /**
     * Performs a click on the provided element.
     *
     * @param {WebdriverIO.Element} element - The element on which the click will be performed.
     * @param {string} elementName - The name of the element to identify it in the logs.
     * @returns {Promise<void>} - A promise that resolves once the click has been performed.
     * @throws {Error} - If the element is not available or cannot be clicked.
     */
    static async click(element: WebdriverIO.Element, elementName: string) {
        await element.waitForDisplayed();
        await element.click();
        console.log(`--- Click on: ${elementName}, Success`);
    }

    /**
     * Sets the value of the provided element to the specified text.
     *
     * @param {WebdriverIO.Element} element - The element whose value will be set.
     * @param {string} addText - The text to set as the element's value.
     * @param {string} elementName - The name of the element to identify it in the logs.
     * @returns {Promise<void>} - A promise that resolves once the value has been set.
     * @throws {Error} - If the element cannot be found or the value cannot be set.
     */
    static async setValue(
        element: WebdriverIO.Element,
        addText: string,
        elementName: string
    ) {
        await element.setValue(addText);
        console.log(
            `--- This Text: ${addText}, was added on the ${elementName} field`
        );
    }

    /**
     * Waits for the provided element to exist on the page.
     *
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {string} elementName - The name of the element to identify it in the logs.
     * @returns {Promise<void>} - A promise that resolves once the element exists on the page.
     * @throws {Error} - If the element does not exist after the default timeout period.
     */
    static async waitForExist(
        element: WebdriverIO.Element,
        elementName: string
    ) {
        await element.waitForExist();
        console.log(
            `--- The ${elementName}, exist on the page: ${await element.isExisting()}`
        );
    }

    /**
     * Selects a value from a dropdown menu element by visible text.
     *
     * @param {WebdriverIO.Element} element - The dropdown menu element.
     * @param {string} value - The visible text of the option to select.
     * @param {string} elementName - The name of the dropdown menu element.
     *
     * @returns {Promise<void>}
     */
    static async dropdown(
        element: WebdriverIO.Element,
        value: string,
        elementName: string
    ) {
        const dropdown = element;
        await dropdown.selectByVisibleText(value);
        console.log(
            `--- In the dropdown - ${elementName} - was selected this option: ${value}`
        );
    }

    /**
     * Generates a random device string.
     * @returns {Promise<string>} A promise that resolves to the randomly generated device string.
     */
    static async randomDevice(): Promise<string> {
        const lengthData = 5;
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let myRandom: string = "";
        for (let i = 0; i < lengthData; i++) {
            myRandom += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        console.log(`--- The new random device added is: ${myRandom}`);
        return myRandom;
    }

    /**
     *Generates a random number between 100 and 999 (inclusive).
     *@returns {Promise<number>} A promise that resolves to the generated random number.
     */
    static async generateRandomNumber(): Promise<number> {
        return Math.floor(Math.random() * 900) + 100;
    }

    /**
     *Check if the current URL matches the expected URL.
     *@param {string} url - The expected URL to compare against.
     *@returns {Promise<void>} - A promise that resolves once the check is complete.
     *@throws {AssertionError} If the current URL does not match the expected URL.
     *@example
     *await checkUrl("http://localhost:3001/devices/add");
     */
    static async checkUrl(url: string) {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.equal(url);
        console.log(`--- The URL is: ${url}`);
    }
}

export default Utils;
