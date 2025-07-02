class ThreeDModelPage {
    constructor(page) {
        this.page = page

        //locators
        this.arVrModeClick = '//p[contains(text(),"AR/VR")]';
        this.typeInput = '//input[@placeholder="Step Title"]';
        this.instructionTextarea = '(//div[@class="ql-editor ql-blank"])[2]';
        this.createNewNode = '(//button[contains(@class,"rizzui-button active:enabled:translate-y-px")])[2]';
        this.uploadImageAndVideoTitle = '//label[text()="Images and Videos"]';
        this.fullScreenButton='//button[@class="bg-white p-[0.20rem] rounded-[3px] fullscreen-toggle"]'
        this.choose3DFile ='//p[contains(text(), "Choose file")]';
    }
    async clickARandVRSection() {
        await this.page.click(this.arVrModeClick)
    }

    async choose3DFiles() {
        await this.page.setInputFiles('input[type="file"]', 'inputFiles/Creator1.obj');
    }
    async fullscreeButton(){
        await this.page.click(this.fullScreenButton)
    }
    
}

module.exports = ThreeDModelPage;