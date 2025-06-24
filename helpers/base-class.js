const { chromium } = require('@playwright/test');

class BaseClass {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }

    async setUp() {
        this.browser = await chromium.launch({
            headless: false,
            slowMo: 100
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        return this.page;
    }

    async tearDown() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    getPage() {
        return this.page;
    }
}

module.exports = BaseClass;