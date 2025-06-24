class ThreeDModelPage {
    constructor(page) {
        this.page = page

        //locators
        this.arVrModeClick = '//button[@id="headlessui-tabs-tab-:ra:"]';
        this.typeInput = '//input[@placeholder="Step Title"]';
        this.instructionTextarea = '(//div[@class="ql-editor ql-blank"])[2]';
        this.createNewNode = '(//button[contains(@class,"rizzui-button active:enabled:translate-y-px")])[2]';
        this.uploadImageAndVideoTitle = '//label[text()="Images and Videos"]';
        this.choose3DFile ='//p[contains(text(), "Choose file")]';
    }
    async clickARandVRSection() {
        await this.page.click(this.arVrModeClick)
    }

    async choose3DFiles() {
        await this.page.click(this.choose3DFile)
    }
}

module.exports = ThreeDModelPage;