class ServerCall {
    open() {
        return browser.url("/");
    }
}

export default new ServerCall();
