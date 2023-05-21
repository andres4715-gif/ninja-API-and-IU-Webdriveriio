class ApiCall {
    open() {
        return browser.url("/");
    }
}

export default new ApiCall();
